'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { I18nProvider } from '@/i18n/context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </AuthProvider>
  );
}
