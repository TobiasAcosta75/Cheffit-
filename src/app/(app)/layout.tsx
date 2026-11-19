import { BottomNav } from './BottomNav';

export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 pb-6 pt-5">{children}</div>
      <BottomNav />
    </div>
  );
}
