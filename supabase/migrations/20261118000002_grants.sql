-- Privilegios explícitos: los proyectos nuevos de Supabase no exponen automáticamente
-- las tablas creadas por migraciones a los roles de la API. RLS sigue filtrando las filas.
grant usage on schema public to authenticated, service_role;

grant select, insert, update, delete on
  public.weight_entries, public.stages, public.training_week, public.training_overrides,
  public.foods, public.household_measures, public.meal_logs
  to authenticated;

-- profiles: el perfil lo crea el trigger; el usuario solo lee y actualiza columnas permitidas
-- (el grant de columnas está en la migración inicial; is_admin queda excluido).
grant select on public.profiles to authenticated;

grant all on all tables in schema public to service_role;
grant execute on function public.is_admin() to authenticated, service_role;
