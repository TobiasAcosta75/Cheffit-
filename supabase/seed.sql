-- Generado por scripts/build-food-seed.ts. No editar a mano.
with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pechuga de pollo (cruda)', 'pechuga de pollo (cruda)', 'carnes', 'usda', 'fdc:171077', 120, 22.5, 0, 2.6, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171077')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pechuga mediana', 174), ('1/2 pechuga', 118)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pechuga de pollo (asada)', 'pechuga de pollo (asada)', 'carnes', 'usda', 'fdc:171477', 165, 31, 0, 3.6, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171477')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1/2 pechuga cocida', 86), ('1 taza en cubos', 140)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Muslo de pollo sin piel (crudo)', 'muslo de pollo sin piel (crudo)', 'carnes', 'usda', 'fdc:173627', 121, 19.7, 0, 4.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173627')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 muslo sin piel', 149)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Carne picada común 80/20 (cruda)', 'carne picada comun 80/20 (cruda)', 'carnes', 'usda', 'fdc:174036', 254, 17.2, 0, 20, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174036')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 hamburguesa casera', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Carne picada especial 90/10 (cruda)', 'carne picada especial 90/10 (cruda)', 'carnes', 'usda', 'fdc:174030', 176, 20, 0, 10, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174030')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 hamburguesa casera', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Carne picada especial 90/10 (cocida)', 'carne picada especial 90/10 (cocida)', 'carnes', 'usda', 'fdc:171793', 204, 25.2, 0, 10.7, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171793')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 hamburguesa cocida', 85)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Carne picada magra 95/5 (cruda)', 'carne picada magra 95/5 (cruda)', 'carnes', 'usda', 'fdc:171790', 137, 21.4, 0, 5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171790')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 hamburguesa casera', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Nalga / bola de lomo (cruda)', 'nalga / bola de lomo (cruda)', 'carnes', 'usda', 'fdc:171759', 116, 23.6, 0, 2.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171759')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bife', 150)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Peceto (crudo)', 'peceto (crudo)', 'carnes', 'usda', 'fdc:171764', 116, 23.4, 0, 2.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171764')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bife', 151)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Lomo (crudo)', 'lomo (crudo)', 'carnes', 'usda', 'fdc:171769', 135, 22.2, 0, 5.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171769')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 medallón', 172)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Cuadril (crudo)', 'cuadril (crudo)', 'carnes', 'usda', 'fdc:174695', 122, 23.1, 0, 3.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174695')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bife', 186)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Vacío (crudo)', 'vacio (crudo)', 'carnes', 'usda', 'fdc:169563', 155, 21.2, 0, 7.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169563')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 188)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Asado de tira (crudo)', 'asado de tira (crudo)', 'carnes', 'usda', 'fdc:169439', 390, 14.4, 0.4, 36.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169439')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 tira', 250)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Hígado vacuno (crudo)', 'higado vacuno (crudo)', 'carnes', 'usda', 'fdc:169451', 135, 20.4, 3.9, 3.6, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169451')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bife', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Lomo de cerdo (crudo)', 'lomo de cerdo (crudo)', 'carnes', 'usda', 'fdc:168249', 109, 21, 0, 2.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168249')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 medallón', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Bondiola de cerdo (cruda)', 'bondiola de cerdo (cruda)', 'carnes', 'usda', 'fdc:167849', 186, 17.4, 0, 12.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:167849')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bife', 150)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Jamón cocido', 'jamon cocido', 'carnes', 'usda', 'fdc:173864', 164, 16.6, 3.6, 8.8, 1.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173864')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 feta', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pechuga de pavo (cruda)', 'pechuga de pavo (cruda)', 'carnes', 'usda', 'fdc:174515', 114, 23.3, 0, 2.3, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174515')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 113)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Salchicha de viena', 'salchicha de viena', 'carnes', 'usda', 'fdc:173862', 315, 11.7, 3, 28.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173862')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 salchicha', 49)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Atún al natural (escurrido)', 'atun al natural (escurrido)', 'pescados', 'usda', 'fdc:173709', 86, 19.4, 0, 1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173709')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata escurrida', 165)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Atún en aceite (escurrido)', 'atun en aceite (escurrido)', 'pescados', 'usda', 'fdc:173708', 198, 29.1, 0, 8.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173708')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata escurrida', 171)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Merluza / pescado blanco (crudo)', 'merluza / pescado blanco (crudo)', 'pescados', 'usda', 'fdc:173713', 90, 18.3, 0, 1.3, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173713')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 filet', 92)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Salmón de criadero (crudo)', 'salmon de criadero (crudo)', 'pescados', 'usda', 'fdc:175167', 208, 20.4, 0, 13.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:175167')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 150)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Sardinas en aceite (escurridas)', 'sardinas en aceite (escurridas)', 'pescados', 'usda', 'fdc:175139', 208, 24.6, 0, 11.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:175139')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata', 92)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Camarones (crudos)', 'camarones (crudos)', 'pescados', 'usda', 'fdc:175179', 85, 20.1, 0, 0.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:175179')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 85)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Huevo entero', 'huevo entero', 'huevos', 'usda', 'fdc:171287', 143, 12.6, 0.7, 9.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171287')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 huevo grande', 50), ('1 huevo extra grande', 56)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Huevo duro', 'huevo duro', 'huevos', 'usda', 'fdc:173424', 155, 12.6, 1.1, 10.6, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173424')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 huevo grande', 50)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Clara de huevo', 'clara de huevo', 'huevos', 'usda', 'fdc:172183', 52, 10.9, 0.7, 0.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172183')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 clara', 33)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Yema de huevo', 'yema de huevo', 'huevos', 'usda', 'fdc:172184', 322, 15.9, 3.6, 26.5, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172184')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 yema', 17)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Leche entera', 'leche entera', 'lacteos', 'usda', 'fdc:171265', 61, 3.2, 4.8, 3.3, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171265')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 244), ('1 vaso', 200), ('1 cucharada', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Leche descremada', 'leche descremada', 'lacteos', 'usda', 'fdc:171269', 34, 3.4, 5, 0.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171269')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 245), ('1 vaso', 200)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Leche parcialmente descremada 1%', 'leche parcialmente descremada 1%', 'lacteos', 'usda', 'fdc:170872', 42, 3.4, 5, 1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170872')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 244), ('1 vaso', 200)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Yogur natural entero', 'yogur natural entero', 'lacteos', 'usda', 'fdc:171284', 61, 3.5, 4.7, 3.3, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171284')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pote', 170), ('1 taza', 245)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Yogur natural descremado', 'yogur natural descremado', 'lacteos', 'usda', 'fdc:170887', 56, 5.7, 7.7, 0.2, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170887')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pote', 170), ('1 taza', 245)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Yogur griego natural descremado', 'yogur griego natural descremado', 'lacteos', 'usda', 'fdc:170894', 59, 10.2, 3.6, 0.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170894')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pote', 170)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso mozzarella', 'queso mozzarella', 'lacteos', 'usda', 'fdc:170845', 299, 22.2, 2.4, 22.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170845')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 feta', 28), ('1 taza rallado', 112)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso rallado tipo parmesano', 'queso rallado tipo parmesano', 'lacteos', 'usda', 'fdc:170848', 392, 35.8, 3.2, 25, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170848')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 5), ('1 porción', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso cottage descremado', 'queso cottage descremado', 'lacteos', 'usda', 'fdc:173417', 72, 12.4, 2.7, 1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173417')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1/2 taza', 113), ('1 taza', 226)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Ricota semidescremada', 'ricota semidescremada', 'lacteos', 'usda', 'fdc:171248', 138, 11.4, 5.1, 7.9, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171248')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1/2 taza', 124), ('1 cucharada', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso crema', 'queso crema', 'lacteos', 'usda', 'fdc:173418', 350, 6.2, 5.5, 34.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173418')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 14.5)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso fresco', 'queso fresco', 'lacteos', 'usda', 'fdc:172223', 299, 18.1, 3, 23.8, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172223')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 30), ('1 taza desmenuzado', 122)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso cheddar', 'queso cheddar', 'lacteos', 'usda', 'fdc:170899', 410, 24.3, 2.1, 33.8, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170899')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 feta', 21)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso tipo pategrás / gruyere', 'queso tipo pategras / gruyere', 'lacteos', 'usda', 'fdc:171251', 393, 27, 1.4, 31, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171251')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 feta', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Queso provolone', 'queso provolone', 'lacteos', 'usda', 'fdc:170850', 351, 25.6, 2.1, 26.6, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170850')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 feta', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Manteca', 'manteca', 'grasas', 'usda', 'fdc:173410', 717, 0.9, 0.1, 81.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173410')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 14.2), ('1 rulo', 5)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Crema de leche', 'crema de leche', 'lacteos', 'usda', 'fdc:170859', 340, 2.8, 2.8, 36.1, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170859')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 15), ('1 taza', 238)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Dulce de leche', 'dulce de leche', 'dulces', 'usda', 'fdc:173461', 315, 6.8, 55.4, 7.4, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173461')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 19)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Proteína de suero (whey)', 'proteina de suero (whey)', 'suplementos', 'usda', 'fdc:173180', 352, 78.1, 6.3, 1.6, 3.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173180')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 scoop', 30)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arroz blanco (crudo)', 'arroz blanco (crudo)', 'cereales', 'usda', 'fdc:168877', 365, 7.1, 80, 0.7, 1.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168877')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 185), ('1 porción', 80)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arroz blanco (cocido)', 'arroz blanco (cocido)', 'cereales', 'usda', 'fdc:168878', 130, 2.7, 28.2, 0.3, 0.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168878')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 158)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arroz integral (crudo)', 'arroz integral (crudo)', 'cereales', 'usda', 'fdc:169703', 367, 7.5, 76.3, 3.2, 3.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169703')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 185), ('1 porción', 80)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arroz integral (cocido)', 'arroz integral (cocido)', 'cereales', 'usda', 'fdc:169704', 123, 2.7, 25.6, 1, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169704')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 202)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Avena arrollada', 'avena arrollada', 'cereales', 'usda', 'fdc:173904', 379, 13.2, 67.7, 6.5, 10.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173904')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 81), ('1/3 taza', 27), ('1 cucharada', 6)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Fideos secos', 'fideos secos', 'cereales', 'usda', 'fdc:169736', 371, 13, 74.7, 1.5, 3.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169736')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 80), ('1 taza de mostachol', 95)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Fideos (cocidos)', 'fideos (cocidos)', 'cereales', 'usda', 'fdc:169737', 158, 5.8, 30.9, 0.9, 1.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169737')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza de spaghetti', 124)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Fideos integrales secos', 'fideos integrales secos', 'cereales', 'usda', 'fdc:169738', 352, 13.9, 73.4, 2.9, 9.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169738')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 80)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Harina de trigo 000', 'harina de trigo 000', 'cereales', 'usda', 'fdc:168894', 364, 10.3, 76.3, 1, 2.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168894')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 125), ('1 cucharada', 8)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Polenta (seca)', 'polenta (seca)', 'cereales', 'usda', 'fdc:168867', 370, 7.1, 79.5, 1.8, 3.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168867')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 157), ('1 porción', 60)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Quinoa (cruda)', 'quinoa (cruda)', 'cereales', 'usda', 'fdc:168874', 368, 14.1, 64.2, 6.1, 7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168874')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 170), ('1 porción', 60)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Quinoa (cocida)', 'quinoa (cocida)', 'cereales', 'usda', 'fdc:168917', 120, 4.4, 21.3, 1.9, 2.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168917')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 185)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Copos de maíz sin azúcar', 'copos de maiz sin azucar', 'cereales', 'usda', 'fdc:174648', 384, 5.9, 88, 0.9, 2.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174648')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Granola', 'granola', 'cereales', 'usda', 'fdc:171646', 489, 13.7, 53.9, 24.3, 8.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171646')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 122), ('1/4 taza', 30)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pan francés', 'pan frances', 'panificados', 'usda', 'fdc:172675', 272, 10.8, 51.9, 2.4, 2.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172675')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 flautita', 60), ('1 rodaja', 30)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pan lactal blanco', 'pan lactal blanco', 'panificados', 'usda', 'fdc:174924', 266, 8.9, 49.4, 3.3, 2.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174924')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 rebanada', 29)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pan lactal integral', 'pan lactal integral', 'panificados', 'usda', 'fdc:172688', 252, 12.5, 42.7, 3.5, 6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172688')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 rebanada', 32)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Tortilla de trigo (rapiditas)', 'tortilla de trigo (rapiditas)', 'panificados', 'usda', 'fdc:175037', 306, 8.2, 49.4, 8, 3.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:175037')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 tortilla', 48)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Galletas de arroz', 'galletas de arroz', 'panificados', 'usda', 'fdc:170250', 387, 8.2, 81.5, 2.8, 4.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170250')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 galleta', 9)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Galletitas de agua', 'galletitas de agua', 'panificados', 'usda', 'fdc:172746', 418, 9.5, 74.1, 8.6, 2.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172746')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('5 galletitas', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Medialuna de manteca', 'medialuna de manteca', 'panificados', 'usda', 'fdc:174987', 406, 8.2, 45.8, 21, 2.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174987')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 medialuna', 42)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Papa (cruda)', 'papa (cruda)', 'tuberculos', 'usda', 'fdc:170026', 77, 2.1, 17.5, 0.1, 2.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170026')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 papa mediana', 213), ('1 papa chica', 170)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Papa hervida', 'papa hervida', 'tuberculos', 'usda', 'fdc:170440', 86, 1.7, 20, 0.1, 1.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170440')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 papa mediana', 167), ('1/2 taza', 78)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Batata (cruda)', 'batata (cruda)', 'tuberculos', 'usda', 'fdc:168482', 86, 1.6, 20.1, 0.1, 3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168482')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 batata mediana', 130), ('1 taza en cubos', 133)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Batata hervida', 'batata hervida', 'tuberculos', 'usda', 'fdc:168484', 76, 1.4, 17.7, 0.1, 2.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168484')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 batata mediana', 151)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Choclo (crudo)', 'choclo (crudo)', 'tuberculos', 'usda', 'fdc:169998', 86, 3.3, 18.7, 1.4, 2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169998')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 choclo mediano', 102), ('1 taza de granos', 145)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mandioca (cruda)', 'mandioca (cruda)', 'tuberculos', 'usda', 'fdc:169985', 160, 1.4, 38.1, 0.3, 1.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169985')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 206)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Lentejas (secas)', 'lentejas (secas)', 'legumbres', 'usda', 'fdc:172420', 352, 24.6, 63.4, 1.1, 10.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172420')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 192), ('1 cucharada', 12)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Lentejas (cocidas)', 'lentejas (cocidas)', 'legumbres', 'usda', 'fdc:172421', 116, 9, 20.1, 0.4, 7.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172421')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 198), ('1 cucharada', 12.3)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Garbanzos (secos)', 'garbanzos (secos)', 'legumbres', 'usda', 'fdc:173756', 378, 20.5, 63, 6, 12.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173756')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 200)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Garbanzos (cocidos)', 'garbanzos (cocidos)', 'legumbres', 'usda', 'fdc:173757', 164, 8.9, 27.4, 2.6, 7.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173757')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 164)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Porotos negros (cocidos)', 'porotos negros (cocidos)', 'legumbres', 'usda', 'fdc:173735', 132, 8.9, 23.7, 0.5, 8.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173735')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 172)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Porotos alubia (cocidos)', 'porotos alubia (cocidos)', 'legumbres', 'usda', 'fdc:175203', 139, 9.7, 25.1, 0.4, 6.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:175203')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 179), ('1 cucharada', 11.2)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arvejas congeladas', 'arvejas congeladas', 'legumbres', 'usda', 'fdc:170016', 77, 5.2, 13.6, 0.4, 4.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170016')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 134)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Tofu firme', 'tofu firme', 'legumbres', 'usda', 'fdc:172475', 144, 17.3, 2.8, 8.7, 2.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172475')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1/2 taza', 126), ('1/4 de bloque', 81)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Hummus', 'hummus', 'legumbres', 'usda', 'fdc:174289', 237, 7.8, 15, 17.8, 5.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174289')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Banana', 'banana', 'frutas', 'usda', 'fdc:173944', 89, 1.1, 22.8, 0.3, 2.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173944')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 banana mediana', 118), ('1 banana chica', 101)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Manzana', 'manzana', 'frutas', 'usda', 'fdc:171688', 52, 0.3, 13.8, 0.2, 2.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171688')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 manzana mediana', 182)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Naranja', 'naranja', 'frutas', 'usda', 'fdc:169097', 47, 0.9, 11.8, 0.1, 2.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169097')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 naranja mediana', 131)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mandarina', 'mandarina', 'frutas', 'usda', 'fdc:169105', 53, 0.8, 13.3, 0.3, 1.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169105')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 mandarina mediana', 88)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Frutillas', 'frutillas', 'frutas', 'usda', 'fdc:167762', 32, 0.7, 7.7, 0.3, 2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:167762')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 144)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Arándanos', 'arandanos', 'frutas', 'usda', 'fdc:171711', 57, 0.7, 14.5, 0.3, 2.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171711')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 148)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pera', 'pera', 'frutas', 'usda', 'fdc:169118', 57, 0.4, 15.2, 0.1, 3.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169118')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pera mediana', 178)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Durazno', 'durazno', 'frutas', 'usda', 'fdc:169928', 39, 0.9, 9.5, 0.3, 1.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169928')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 durazno mediano', 150)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Kiwi', 'kiwi', 'frutas', 'usda', 'fdc:168153', 61, 1.1, 14.7, 0.5, 3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168153')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 kiwi', 69)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Uvas', 'uvas', 'frutas', 'usda', 'fdc:174683', 69, 0.7, 18.1, 0.2, 0.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174683')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('10 uvas', 49), ('1 taza', 151)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Ananá', 'anana', 'frutas', 'usda', 'fdc:169124', 50, 0.5, 13.1, 0.1, 1.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169124')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 rodaja', 84), ('1 taza en trozos', 165)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Sandía', 'sandia', 'frutas', 'usda', 'fdc:167765', 30, 0.6, 7.6, 0.2, 0.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:167765')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 tajada', 286), ('1 taza en cubos', 152)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Melón', 'melon', 'frutas', 'usda', 'fdc:169092', 34, 0.8, 8.2, 0.2, 0.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169092')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza en cubos', 160)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Limón (jugo y pulpa)', 'limon (jugo y pulpa)', 'frutas', 'usda', 'fdc:167746', 29, 1.1, 9.3, 0.3, 2.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:167746')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 limón', 58)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Palta', 'palta', 'frutas', 'usda', 'fdc:171705', 160, 2, 8.5, 14.7, 6.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171705')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 palta', 201), ('1/2 palta', 100)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mango', 'mango', 'frutas', 'usda', 'fdc:169910', 60, 0.8, 15, 0.4, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169910')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 mango sin cáscara', 336)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Ciruela', 'ciruela', 'frutas', 'usda', 'fdc:169949', 46, 0.7, 11.4, 0.3, 1.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169949')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 ciruela', 66)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pasas de uva', 'pasas de uva', 'frutas', 'usda', 'fdc:168165', 299, 3.3, 79.3, 0.3, 4.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168165')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cajita', 14), ('1 cucharada', 9)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Dátiles', 'datiles', 'frutas', 'usda', 'fdc:168191', 277, 1.8, 75, 0.2, 6.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168191')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 dátil', 24)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Lechuga', 'lechuga', 'verduras', 'usda', 'fdc:169249', 15, 1.4, 2.9, 0.2, 1.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169249')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 36), ('1 hoja grande', 24)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Tomate', 'tomate', 'verduras', 'usda', 'fdc:170457', 18, 0.9, 3.9, 0.2, 1.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170457')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 tomate perita', 62), ('1 taza picado', 180)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Cebolla', 'cebolla', 'verduras', 'usda', 'fdc:170000', 40, 1.1, 9.3, 0.1, 1.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170000')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cebolla grande', 150), ('1 cucharada picada', 10)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Zanahoria', 'zanahoria', 'verduras', 'usda', 'fdc:170393', 41, 0.9, 9.6, 0.2, 2.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170393')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 zanahoria grande', 72), ('1 taza rallada', 110)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Zapallo anco', 'zapallo anco', 'verduras', 'usda', 'fdc:169295', 45, 1, 11.7, 0.1, 2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169295')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza en cubos', 140)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Zapallito / zucchini', 'zapallito / zucchini', 'verduras', 'usda', 'fdc:169291', 17, 1.2, 3.1, 0.3, 1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169291')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 zucchini mediano', 196)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Berenjena', 'berenjena', 'verduras', 'usda', 'fdc:169228', 25, 1, 5.9, 0.2, 3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169228')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza en cubos', 82)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Morrón rojo', 'morron rojo', 'verduras', 'usda', 'fdc:170108', 26, 1, 6, 0.3, 2.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170108')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 morrón grande', 164), ('1 cucharada', 9.3)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Morrón verde', 'morron verde', 'verduras', 'usda', 'fdc:170427', 20, 0.9, 4.6, 0.2, 1.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170427')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 morrón grande', 164)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Brócoli', 'brocoli', 'verduras', 'usda', 'fdc:170379', 34, 2.8, 6.6, 0.4, 2.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170379')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza picado', 91)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Coliflor', 'coliflor', 'verduras', 'usda', 'fdc:169986', 25, 1.9, 5, 0.3, 2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169986')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza picada', 107), ('1 ramito', 13)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Espinaca', 'espinaca', 'verduras', 'usda', 'fdc:168462', 23, 2.9, 3.6, 0.4, 2.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168462')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 30), ('1 paquete', 284)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Acelga', 'acelga', 'verduras', 'usda', 'fdc:169991', 19, 1.8, 3.7, 0.2, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169991')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 36), ('1 hoja', 48)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pepino', 'pepino', 'verduras', 'usda', 'fdc:168409', 15, 0.7, 3.6, 0.1, 0.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168409')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 pepino', 301), ('1/2 taza en rodajas', 52)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Repollo', 'repollo', 'verduras', 'usda', 'fdc:169975', 25, 1.3, 5.8, 0.1, 2.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169975')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza picado', 89)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Champiñones', 'champinones', 'verduras', 'usda', 'fdc:169251', 22, 3.1, 3.3, 0.3, 1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169251')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza fileteados', 70), ('1 champiñón mediano', 18)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Remolacha', 'remolacha', 'verduras', 'usda', 'fdc:169145', 43, 1.6, 9.6, 0.2, 2.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169145')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 remolacha', 82)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Chauchas', 'chauchas', 'verduras', 'usda', 'fdc:169961', 31, 1.8, 7, 0.2, 2.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169961')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 100)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Ajo', 'ajo', 'verduras', 'usda', 'fdc:169230', 149, 6.4, 33.1, 0.5, 2.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169230')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 diente', 3)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Rúcula', 'rucula', 'verduras', 'usda', 'fdc:169387', 25, 2.6, 3.7, 0.7, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169387')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1/2 taza', 10)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Apio', 'apio', 'verduras', 'usda', 'fdc:169988', 14, 0.7, 3, 0.2, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169988')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 tallo grande', 64)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Puré de tomate', 'pure de tomate', 'verduras', 'usda', 'fdc:170460', 38, 1.7, 9, 0.2, 1.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170460')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 250), ('1 cucharada', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Tomate en lata', 'tomate en lata', 'verduras', 'usda', 'fdc:170051', 16, 0.8, 3.5, 0.3, 1.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170051')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata', 190), ('1 taza', 240)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Aceite de oliva', 'aceite de oliva', 'grasas', 'usda', 'fdc:171413', 884, 0, 0, 100, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171413')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 13.5), ('1 cucharadita', 4.5)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Aceite de girasol', 'aceite de girasol', 'grasas', 'usda', 'fdc:171025', 884, 0, 0, 100, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171025')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 13.6), ('1 cucharadita', 4.5)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mayonesa', 'mayonesa', 'grasas', 'usda', 'fdc:171009', 680, 1, 0.6, 74.9, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171009')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 13.8), ('1 sobre', 10)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mayonesa light', 'mayonesa light', 'grasas', 'usda', 'fdc:171443', 361, 0.4, 0, 40, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171443')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 15)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Aceitunas negras', 'aceitunas negras', 'grasas', 'usda', 'fdc:169094', 116, 0.8, 6, 10.9, 1.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169094')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 aceituna', 4.4)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Aceitunas verdes', 'aceitunas verdes', 'grasas', 'usda', 'fdc:169096', 145, 1, 3.8, 15.3, 3.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169096')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 aceituna', 2.7)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Maní', 'mani', 'frutos_secos', 'usda', 'fdc:172430', 567, 25.8, 16.1, 49.2, 8.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172430')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 puñado', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mantequilla de maní', 'mantequilla de mani', 'frutos_secos', 'usda', 'fdc:172470', 598, 22.2, 22.3, 51.4, 5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172470')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 16)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Almendras', 'almendras', 'frutos_secos', 'usda', 'fdc:170567', 579, 21.2, 21.6, 49.9, 12.5
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170567')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 puñado', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Nueces', 'nueces', 'frutos_secos', 'usda', 'fdc:170187', 654, 15.2, 13.7, 65.2, 6.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170187')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 puñado', 28), ('1 mitad', 2)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Castañas de cajú', 'castanas de caju', 'frutos_secos', 'usda', 'fdc:170162', 553, 18.2, 30.2, 43.9, 3.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170162')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 puñado', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Semillas de chía', 'semillas de chia', 'frutos_secos', 'usda', 'fdc:170554', 486, 16.5, 42.1, 30.7, 34.4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170554')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 12)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Semillas de lino', 'semillas de lino', 'frutos_secos', 'usda', 'fdc:169414', 534, 18.3, 28.9, 42.2, 27.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169414')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 10.3)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Semillas de girasol', 'semillas de girasol', 'frutos_secos', 'usda', 'fdc:170562', 584, 20.8, 20, 51.5, 8.6
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170562')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 9)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Semillas de sésamo', 'semillas de sesamo', 'frutos_secos', 'usda', 'fdc:170150', 573, 17.7, 23.5, 49.7, 11.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170150')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 9)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Azúcar', 'azucar', 'dulces', 'usda', 'fdc:169655', 387, 0, 100, 0, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169655')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharadita', 4.2), ('1 sobre', 2.8)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Miel', 'miel', 'dulces', 'usda', 'fdc:169640', 304, 0.3, 82.4, 0, 0.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169640')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 21)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mermelada', 'mermelada', 'dulces', 'usda', 'fdc:169641', 278, 0.4, 68.9, 0.1, 1.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169641')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 20)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Cacao amargo en polvo', 'cacao amargo en polvo', 'dulces', 'usda', 'fdc:169593', 228, 19.6, 57.9, 13.7, 37
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169593')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 5.4)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Chocolate amargo 70-85%', 'chocolate amargo 70-85%', 'dulces', 'usda', 'fdc:170273', 598, 7.8, 45.9, 42.6, 10.9
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170273')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cuadradito', 10), ('1 barra', 101)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Helado de crema americana', 'helado de crema americana', 'dulces', 'usda', 'fdc:167575', 207, 3.5, 23.6, 11, 0.7
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:167575')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 bocha', 66)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Ketchup', 'ketchup', 'condimentos', 'usda', 'fdc:168556', 101, 1, 27.4, 0.1, 0.3
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168556')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 17), ('1 sobre', 9)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Mostaza', 'mostaza', 'condimentos', 'usda', 'fdc:172234', 60, 3.7, 5.8, 3.3, 4
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:172234')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharadita', 5)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Salsa de soja', 'salsa de soja', 'condimentos', 'usda', 'fdc:174278', 60, 10.5, 5.6, 0.1, 0.8
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174278')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 cucharada', 18)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Gaseosa cola', 'gaseosa cola', 'bebidas', 'usda', 'fdc:174852', 42, 0, 10.4, 0.3, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174852')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata', 370), ('1 vaso', 250)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Jugo de naranja exprimido', 'jugo de naranja exprimido', 'bebidas', 'usda', 'fdc:169098', 45, 0.7, 10.4, 0.2, 0.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169098')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 vaso', 248)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Cerveza', 'cerveza', 'bebidas', 'usda', 'fdc:168746', 43, 0.5, 3.6, 0, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:168746')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 lata', 356), ('1 vaso', 250)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Vino tinto', 'vino tinto', 'bebidas', 'usda', 'fdc:173190', 85, 0.1, 2.6, 0, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:173190')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 copa', 147)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Café', 'cafe', 'bebidas', 'usda', 'fdc:171890', 1, 0.1, 0, 0, 0
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:171890')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 237)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Leche de almendras sin azúcar', 'leche de almendras sin azucar', 'bebidas', 'usda', 'fdc:174832', 15, 0.4, 1.3, 1, 0.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:174832')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 taza', 262)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Papas fritas de paquete', 'papas fritas de paquete', 'snacks', 'usda', 'fdc:169677', 532, 6.4, 53.8, 34, 3.1
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:169677')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 28)) as m(label, grams);

with new_food as (
  insert into public.foods (name, search_name, category, source, source_ref, kcal_100, protein_100, carbs_100, fat_100, fiber_100)
    select 'Pizza de muzzarella', 'pizza de muzzarella', 'snacks', 'usda', 'fdc:170317', 268, 10.4, 29, 12.3, 2.2
    where not exists (select 1 from public.foods f where f.owner_id is null and f.source_ref = 'fdc:170317')
    returning id
)
insert into public.household_measures (food_id, label, grams)
  select new_food.id, m.label, m.grams from new_food, (values ('1 porción', 81)) as m(label, grams);
