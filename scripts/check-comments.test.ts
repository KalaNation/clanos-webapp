import { describe, expect, it } from 'vitest';

import { runCheck } from './test-utils';

const check = (fileName: string, source: string) =>
  runCheck('check-comments.mjs', fileName, source);

describe('check-comments', () => {
  it('allows comments of up to 3 lines', () => {
    expect(check('a.ts', '// one\n// two\n// three\nconst a = 1;\n').passed).toBe(true);
  });

  it('rejects a run of 4 line comments', () => {
    const result = check('a.ts', '// one\n// two\n// three\n// four\nconst a = 1;\n');
    expect(result.passed).toBe(false);
    expect(result.output).toContain('comment is 4 lines');
  });

  it('counts only the text lines of a block comment', () => {
    expect(check('a.ts', '/**\n * One line.\n */\nconst a = 1;\n').passed).toBe(true);
    expect(check('a.ts', '/*\n a\n b\n c\n d\n*/\nconst a = 1;\n').passed).toBe(false);
  });

  it('allows a long JSDoc directly above an export, but not above anything else', () => {
    const jsdoc = '/**\n * a\n * b\n * c\n * d\n */\n';
    expect(check('a.ts', `${jsdoc}export function a() {}\n`).passed).toBe(true);
    expect(check('a.ts', `${jsdoc}function a() {}\n`).passed).toBe(false);
  });

  it('requires an issue number on every TODO', () => {
    expect(check('a.ts', '// TODO: later\n').output).toContain('TODO without an issue number');
    expect(check('a.ts', '// TODO(#42): later\n').passed).toBe(true);
  });

  it('allows TODO(token), which AGENTS.md uses for missing design tokens', () => {
    expect(check('a.css', '/* TODO(token): no 7px space token */\n').passed).toBe(true);
  });

  it('ignores comment-like text in strings, regexes, templates and JSX', () => {
    const source = [
      "const url = 'https://example.com';",
      "const glob = 'src/**/*.ts';",
      'const re = /\\/\\/ TODO/;',
      'const t = `\n// TODO\n// TODO\n// TODO\n// TODO\n`;',
      'export const A = () => <p>// TODO visible text</p>;',
    ].join('\n');
    expect(check('a.tsx', source).passed).toBe(true);
  });

  it('checks CSS block comments', () => {
    expect(check('a.css', '/* a\n b\n c\n d */\n.a {}\n').passed).toBe(false);
  });
});
