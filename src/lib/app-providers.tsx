'use client';

import type * as React from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { NonceProvider } from './security/nonce';

/** Every app-wide provider, in one place. Context is for providers only (see ADR 0002). */
export function AppProviders({ nonce, children }: { nonce?: string; children: React.ReactNode }) {
  return (
    <NonceProvider nonce={nonce}>
      <TooltipProvider>{children}</TooltipProvider>
    </NonceProvider>
  );
}
