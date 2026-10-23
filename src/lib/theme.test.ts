import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { SPACING_KEYS, TEXT_STYLES } from './theme';
import { cn } from './utils';

const globalsCss = readFileSync(join(import.meta.dirname, '../app/globals.css'), 'utf8');
const tokensCss = readFileSync(join(import.meta.dirname, '../styles/tokens.css'), 'utf8');

describe('theme', () => {
  it.each(TEXT_STYLES)('defines t-%s in globals.css from the token pair', (name) => {
    expect(globalsCss).toContain(`@utility t-${name} {`);
    expect(tokensCss).toContain(`--t-${name}:`);
    expect(tokensCss).toContain(`--ls-${name}:`);
  });

  it.each(SPACING_KEYS)('maps the %s spacing key in globals.css', (key) => {
    expect(globalsCss).toContain(`--spacing-${key}: var(--`);
  });
});

describe('cn', () => {
  it('lets a later spacing token win', () => {
    expect(cn('p-sp-16', 'p-sp-8')).toBe('p-sp-8');
    expect(cn('h-control', 'h-control-sm')).toBe('h-control-sm');
  });

  it('lets a later text style win, but keeps colour and text style together', () => {
    expect(cn('t-h1', 't-body')).toBe('t-body');
    expect(cn('text-tx', 't-body')).toBe('text-tx t-body');
  });

  it('joins conditional classes and lets the later surface win', () => {
    const surface = (raised: boolean) => cn('bg-s1', raised && 'bg-s2', { 'text-mut': !raised });
    expect(surface(false)).toBe('bg-s1 text-mut');
    expect(surface(true)).toBe('bg-s2');
  });
});
