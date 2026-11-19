import { Suspense } from 'react';
import { requireUser } from '@/lib/auth';
import { FoodsManager } from './FoodsManager';

export default function FoodsPage() {
  return (
    <Suspense fallback={<p className="text-muted">Cargando alimentos…</p>}>
      <FoodsContent />
    </Suspense>
  );
}

async function FoodsContent() {
  const { user, profile } = await requireUser();
  return <FoodsManager userId={user.id} isAdmin={profile.is_admin} />;
}
