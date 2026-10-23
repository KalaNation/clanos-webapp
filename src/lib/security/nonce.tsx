'use client';

import type * as React from 'react';
import { createContext, use } from 'react';

const NonceContext = createContext<string | undefined>(undefined);

/** Shares this request's CSP nonce, read by the root layout, with client components. */
export function NonceProvider({ nonce, children }: { nonce?: string; children: React.ReactNode }) {
  return <NonceContext value={nonce}>{children}</NonceContext>;
}

/** Pass this to any `<Script nonce={…}>` or inline script; without it the CSP blocks the script. */
export function useNonce() {
  return use(NonceContext);
}
