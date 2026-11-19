'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Hoy' },
  { href: '/etapas', label: 'Etapas' },
  { href: '/entreno', label: 'Entreno' },
  { href: '/alimentos', label: 'Alimentos' },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="sticky bottom-0 border-t border-border bg-bg/95 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {LINKS.map((l) => {
          const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium ${active ? 'text-accent' : 'text-muted'}`}
              >
                <span className={`h-1 w-6 rounded-full ${active ? 'bg-accent' : 'bg-transparent'}`} aria-hidden="true" />
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
