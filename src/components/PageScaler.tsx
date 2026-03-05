'use client';

import { usePathname } from 'next/navigation';

export default function PageScaler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return <div className="flex-1">{children}</div>;
  }

  return (
    <div className="flex-1 origin-top" style={{ fontSize: '90%' }}>
      {children}
    </div>
  );
}
