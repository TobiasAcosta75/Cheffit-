/**
 * Genera supabase/seed.sql con los alimentos globales a partir de data/food-map.csv.
 *
 * Uso: npx tsx scripts/build-food-seed.ts --usda-dir <carpeta del CSV "SR Legacy" de USDA FoodData Central>
 *
 * Los macros de las filas con fdc_id salen del dataset oficial (descargado aparte, no versionado);
 * las filas sin fdc_id usan los valores manuales del CSV. El SQL es idempotente: no duplica
 * alimentos globales ya cargados (por source_ref o nombre).
 */
import fs from 'node:fs';
import path from 'node:path';
import { normalizeForSearch } from '../src/domain/foods';
import type { FoodPer100, FoodSource } from '../src/domain/types';

export interface Measure {
  label: string;
  grams: number;
}

export interface FoodMapRow {
  name: string;
  category: string;
  fdcId: number | null;
  manual: FoodPer100 | null;
  source: FoodSource;
  measures: Measure[];
}

export interface FdcFood {
  fdcId: number;
  description: string;
  /** nutrient_id → cantidad por 100 g */
  nutrients: Record<number, number>;
}

export interface FoodSeed extends FoodPer100 {
  name: string;
  searchName: string;
  category: string;
  source: FoodSource;
  sourceRef: string | null;
  measures: Measure[];
}

const NUTRIENT = { protein: 1003, fat: 1004, carbs: 1005, energy: 1008, energyAtwaterGeneral: 2047, energyAtwaterSpecific: 2048, fiber: 1079 };

/** Separa una línea CSV respetando comillas dobles. */
export function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

const num = (s: string) => (s.trim() === '' ? null : Number(s));

export function parseFoodMap(csv: string): FoodMapRow[] {
  const lines = csv.replace(/\r/g, '').split('\n').filter((l) => l.trim() !== '');
  return lines.slice(1).map((line) => {
    const [name, category, fdcId, kcal, protein, carbs, fat, fiber, source, measures] = splitCsvLine(line);
    const manualValues = [kcal, protein, carbs, fat].map(num);
    const hasManual = manualValues.every((v) => v !== null);
    const id = num(fdcId ?? '');
    if (id === null && !hasManual) throw new Error(`Fila "${name}" sin fdc_id ni macros manuales`);
    return {
      name: name.trim(),
      category: category.trim(),
      fdcId: id,
      manual: hasManual
        ? { kcal: manualValues[0]!, protein: manualValues[1]!, carbs: manualValues[2]!, fat: manualValues[3]!, fiber: num(fiber ?? '') ?? 0 }
        : null,
      source: source.trim() as FoodSource,
      measures: (measures ?? '')
        .split('|')
        .map((m) => m.trim())
        .filter(Boolean)
        .map((m) => {
          const idx = m.lastIndexOf(':');
          return { label: m.slice(0, idx).trim(), grams: Number(m.slice(idx + 1)) };
        }),
    };
  });
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function fdcToFood(fdc: FdcFood, row: FoodMapRow): FoodSeed {
  const n = (id: number) => fdc.nutrients[id];
  const protein = n(NUTRIENT.protein) ?? 0;
  const carbs = n(NUTRIENT.carbs) ?? 0;
  const fat = n(NUTRIENT.fat) ?? 0;
  const kcal =
    n(NUTRIENT.energy) ?? n(NUTRIENT.energyAtwaterGeneral) ?? n(NUTRIENT.energyAtwaterSpecific) ?? 4 * protein + 4 * carbs + 9 * fat;
  return {
    name: row.name,
    searchName: normalizeForSearch(row.name),
    category: row.category,
    source: row.source,
    sourceRef: `fdc:${fdc.fdcId}`,
    kcal: Math.round(kcal),
    protein: round1(protein),
    carbs: round1(carbs),
    fat: round1(fat),
    fiber: round1(n(NUTRIENT.fiber) ?? 0),
    measures: row.measures,
  };
}

export function manualToFood(row: FoodMapRow): FoodSeed {
  if (!row.manual) throw new Error(`Fila "${row.name}" sin macros manuales`);
  return { ...row.manual, name: row.name, searchName: normalizeForSearch(row.name), category: row.category, source: row.source, sourceRef: null, measures: row.measures };
}

const q = (s: string | null) => (s === null ? 'null' : `'${s.replace(/'/g, "''")}'`);

export function toSeedSql(foods: FoodSeed[]): string {
  const header = '-- Generado por scripts/build-food-seed.ts. No editar a mano.\n';
  const statements = foods.map((f) => {
    const exists = f.sourceRef
      ? `f.owner_id is null and f.source_ref = ${q(f.sourceRef)}`
      : `f.owner_id is null and f.search_name = ${q(f.searchName)}`;
    const insertFood =
      `insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)\n` +
      `  select ${q(f.name)}, ${q(f.searchName)}, ${q(f.category)}, ${q(f.source)}, ${q(f.sourceRef)}, ${f.kcal}, ${f.protein}, ${f.carbs}, ${f.fat}, ${f.fiber}\n` +
      `  where not exists (select 1 from public.foods f where ${exists})\n  returning id`;
    if (f.measures.length === 0) return `${insertFood};`;
    const values = f.measures.map((m) => `(${q(m.label)}, ${m.grams})`).join(', ');
    return (
      `with new_food as (\n  ${insertFood.replace(/\n/g, '\n  ')}\n)\n` +
      `insert into public.household_measures (food_id, label, grams)\n` +
      `  select new_food.id, m.label, m.grams from new_food, (values ${values}) as m(label, grams);`
    );
  });
  return header + statements.join('\n\n') + '\n';
}

/** Lee del dataset SR Legacy solo los alimentos pedidos y los nutrientes que usamos. */
export function loadUsdaFoods(usdaDir: string, fdcIds: Set<number>): Map<number, FdcFood> {
  const foods = new Map<number, FdcFood>();
  for (const line of fs.readFileSync(path.join(usdaDir, 'food.csv'), 'utf8').split('\n').slice(1)) {
    if (!line) continue;
    const [id, , description] = splitCsvLine(line);
    const fdcId = Number(id);
    if (fdcIds.has(fdcId)) foods.set(fdcId, { fdcId, description, nutrients: {} });
  }
  const wanted = new Set(Object.values(NUTRIENT));
  for (const line of fs.readFileSync(path.join(usdaDir, 'food_nutrient.csv'), 'utf8').split('\n').slice(1)) {
    if (!line) continue;
    const [, id, nutrientId, amount] = splitCsvLine(line);
    const food = foods.get(Number(id));
    if (food && wanted.has(Number(nutrientId))) food.nutrients[Number(nutrientId)] = Number(amount);
  }
  return foods;
}

function main() {
  const dirFlag = process.argv.indexOf('--usda-dir');
  if (dirFlag === -1 || !process.argv[dirFlag + 1]) throw new Error('Falta --usda-dir <carpeta>');
  const usdaDir = process.argv[dirFlag + 1];
  const root = path.resolve(__dirname, '..');
  const rows = parseFoodMap(fs.readFileSync(path.join(root, 'data/food-map.csv'), 'utf8'));
  const usda = loadUsdaFoods(usdaDir, new Set(rows.flatMap((r) => (r.fdcId ? [r.fdcId] : []))));
  const seeds = rows.map((r) => {
    if (r.fdcId === null) return manualToFood(r);
    const fdc = usda.get(r.fdcId);
    if (!fdc) throw new Error(`fdc_id ${r.fdcId} (${r.name}) no está en el dataset`);
    console.log(`${r.name} ← ${fdc.description}`);
    return fdcToFood(fdc, r);
  });
  fs.writeFileSync(path.join(root, 'supabase/seed.sql'), toSeedSql(seeds));
  console.log(`\n${seeds.length} alimentos escritos en supabase/seed.sql`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) main();
