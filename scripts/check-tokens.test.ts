import { describe, expect, it } from 'vitest';

import { runCheck } from './test-utils';

const check = (source: string, fileName = 'a.tsx') =>
  runCheck('check-tokens.mjs', fileName, source);

describe('check-tokens', () => {
  it.each([
    ['a raw hex colour', '<div style={{ color: "#17191f" }} />', 'raw hex colour'],
    ['a colour function', '<div style={{ color: "rgb(1, 2, 3)" }} />', 'raw colour function'],
    ['a px font size', 'const s = { fontSize: "15px" };', 'px type value'],
    ['px spacing', 'const s = { padding: "13px" };', 'px spacing or radius'],
    ['a Tailwind arbitrary value', '<div className="p-[13px]" />', 'Tailwind arbitrary value'],
    ['the Tailwind palette', '<div className="bg-zinc-900" />', 'Tailwind default palette'],
  ])('rejects %s', (_, source, rule) => {
    const result = check(source);
    expect(result.passed).toBe(false);
    expect(result.output).toContain(rule);
  });

  it('accepts token-based styles', () => {
    expect(check('<div className="bg-s1 text-tx t-body" />').passed).toBe(true);
  });

  it('allows a line that is marked tokens-ignore with a reason', () => {
    const source = 'const brand = "#9fd959"; // tokens-ignore: OG image needs a literal';
    expect(check(source).passed).toBe(true);
  });

  it('checks a single file path, as lint-staged passes them', () => {
    expect(check('.a { color: #fff; }', 'a.css').passed).toBe(false);
  });
});
