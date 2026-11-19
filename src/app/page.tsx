import { Suspense } from 'react';
import { requireUser } from '@/lib/auth';

// Panel del día: se construye en la Tarea 10.
export default function Home() {
  return (
    <Suspense fallback={<main className="p-4 text-muted">Cargando…</main>}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const { profile } = await requireUser();
  return <main className="p-4">Hola {profile.display_name ?? ''}</main>;
}
