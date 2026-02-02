'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav';

export function DocNav() {
  const pathname = usePathname();

  return (
    <div aria-label="Dossier navigation">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
