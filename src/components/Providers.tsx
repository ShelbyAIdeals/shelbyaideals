'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { I18nProvider } from '@/i18n/context';

/** Error boundary — prevents provider crashes from breaking the entire site */
class ProviderErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Provider initialization error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render children without providers — site works, just no auth/i18n
      return this.props.children;
    }
    return this.props.children;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProviderErrorBoundary>
      <AuthProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </AuthProvider>
    </ProviderErrorBoundary>
  );
}
