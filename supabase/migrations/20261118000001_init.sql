-- Chef Deportivo — esquema inicial (fase 1)
create extension if not exists pg_trgm with schema extensions;

-- ───────────── Perfiles ─────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  sex text check (sex in ('male', 'female')),
  birth_date date,
  height_cm numeric check (height_cm between 120 and 230),
  activity_level text check (activity_level in ('sedentary', 'light', 'moderate', 'high', 'very_high')),
  goal text check (goal in ('cut', 'maintain', 'bulk')),
  timezone text not null default 'America/Argentina/Buenos_Aires',
  meal_slots text[] not null default '{}',
  avoided_foods text[] not null default '{}',
  restrictions text[] not null default '{}',
  max_cook_minutes int check (max_cook_minutes > 0),
  reference_weight_kg numeric check (reference_weight_kg between 30 and 300),
  onboarded boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- ───────────── Peso ─────────────
create table public.weight_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  weight_kg numeric not null check (weight_kg between 30 and 300),
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

-- ───────────── Etapas ─────────────
create table public.stages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  start_date date not null,
  end_date date,
  goal text not null check (goal in ('cut', 'maintain', 'bulk')),
  mode text not null check (mode in ('auto', 'manual')),
  protein_g_per_kg numeric not null check (protein_g_per_kg between 0 and 5),
  carbs_training_g_per_kg numeric not null check (carbs_training_g_per_kg between 0 and 5),
  carbs_rest_g_per_kg numeric not null check (carbs_rest_g_per_kg between 0 and 5),
  fat_g_per_kg numeric not null check (fat_g_per_kg between 0 and 5),
  notes text,
  created_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);
create index stages_user_idx on public.stages (user_id, start_date);

-- ───────────── Entrenamiento ─────────────
create table public.training_week (
  user_id uuid not null references auth.users (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  trains boolean not null default false,
  time time,
  intensity text check (intensity in ('low', 'medium', 'high')),
  created_at timestamptz not null default now(),
  primary key (user_id, weekday),
  check (not trains or time is not null)
);

create table public.training_overrides (
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  trains boolean not null,
  time time,
  intensity text check (intensity in ('low', 'medium', 'high')),
  created_at timestamptz not null default now(),
  primary key (user_id, date),
  check (not trains or time is not null)
);

-- ───────────── Alimentos ─────────────
create table public.foods (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users (id) on delete cascade,
  overrides_food_id uuid references public.foods (id) on delete cascade,
  name text not null,
  search_name text not null,
  category text not null default 'otros',
  source text not null check (source in ('usda', 'argenfoods', 'off', 'manual', 'user')),
  source_ref text,
  kcal_100 numeric not null check (kcal_100 >= 0),
  protein_100 numeric not null check (protein_100 >= 0),
  carbs_100 numeric not null check (carbs_100 >= 0),
  fat_100 numeric not null check (fat_100 >= 0),
  fiber_100 numeric not null default 0 check (fiber_100 >= 0),
  created_at timestamptz not null default now(),
  unique (owner_id, overrides_food_id),
  check (overrides_food_id is null or owner_id is not null)
);
create index foods_search_trgm_idx on public.foods using gin (search_name extensions.gin_trgm_ops);
create index foods_owner_idx on public.foods (owner_id);

create table public.household_measures (
  id uuid primary key default gen_random_uuid(),
  food_id uuid not null references public.foods (id) on delete cascade,
  label text not null,
  grams numeric not null check (grams > 0),
  created_at timestamptz not null default now()
);
create index household_measures_food_idx on public.household_measures (food_id);

-- ───────────── Registro de comidas (snapshot de macros) ─────────────
create table public.meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  slot text not null check (slot in ('breakfast', 'lunch', 'snack', 'dinner', 'pre_workout', 'post_workout', 'extra')),
  food_id uuid references public.foods (id) on delete set null,
  food_name text not null,
  grams numeric not null check (grams > 0 and grams <= 5000),
  protein_g numeric not null,
  carbs_g numeric not null,
  fat_g numeric not null,
  kcal numeric not null,
  created_at timestamptz not null default now()
);
create index meal_logs_user_date_idx on public.meal_logs (user_id, date);

-- ───────────── RLS ─────────────
alter table public.profiles enable row level security;
alter table public.weight_entries enable row level security;
alter table public.stages enable row level security;
alter table public.training_week enable row level security;
alter table public.training_overrides enable row level security;
alter table public.foods enable row level security;
alter table public.household_measures enable row level security;
alter table public.meal_logs enable row level security;

create policy "own profile select" on public.profiles for select to authenticated using (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- El usuario no puede modificar is_admin ni id: solo se le otorgan las demás columnas.
revoke update on public.profiles from authenticated, anon;
grant update (display_name, sex, birth_date, height_cm, activity_level, goal, timezone, meal_slots,
  avoided_foods, restrictions, max_cook_minutes, reference_weight_kg, onboarded)
  on public.profiles to authenticated;

create policy "own rows" on public.weight_entries for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on public.stages for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on public.training_week for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on public.training_overrides for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows" on public.meal_logs for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "foods visible" on public.foods for select to authenticated
  using (owner_id is null or owner_id = auth.uid());
create policy "foods insert" on public.foods for insert to authenticated
  with check (owner_id = auth.uid() or (owner_id is null and public.is_admin()));
create policy "foods update" on public.foods for update to authenticated
  using (owner_id = auth.uid() or (owner_id is null and public.is_admin()))
  with check (owner_id = auth.uid() or (owner_id is null and public.is_admin()));
create policy "foods delete" on public.foods for delete to authenticated
  using (owner_id = auth.uid() or (owner_id is null and public.is_admin()));

create policy "measures visible" on public.household_measures for select to authenticated
  using (exists (select 1 from public.foods f where f.id = food_id
    and (f.owner_id is null or f.owner_id = auth.uid())));
create policy "measures write" on public.household_measures for all to authenticated
  using (exists (select 1 from public.foods f where f.id = food_id
    and (f.owner_id = auth.uid() or (f.owner_id is null and public.is_admin()))))
  with check (exists (select 1 from public.foods f where f.id = food_id
    and (f.owner_id = auth.uid() or (f.owner_id is null and public.is_admin()))));
