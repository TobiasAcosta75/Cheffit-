import { requireUser } from '@/lib/auth';

// Panel del día: se construye en la Tarea 10.
export default async function Home() {
  const { profile } = await requireUser();
  return <main className="p-4">Hola {profile.display_name ?? ''}</main>;
}
