import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { todayIn } from '@/domain/dates';
import { requireUser } from '@/lib/auth';
import { OnboardingForm } from './OnboardingForm';

export default function OnboardingPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pb-10 pt-6">
      <Suspense fallback={<p className="text-muted">Cargando…</p>}>
        <OnboardingContent />
      </Suspense>
    </main>
  );
}

async function OnboardingContent() {
  const { profile } = await requireUser({ allowNotOnboarded: true });
  if (profile.onboarded) redirect('/');
  return <OnboardingForm today={todayIn(profile.timezone)} />;
}
