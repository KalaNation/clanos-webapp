#!/usr/bin/env node
// Fails when UI code uses a raw visual value instead of a CLANOS design token.
// usage: node scripts/check-tokens.mjs [dir ...]      (default: src)
// To allow one line on purpose, end it with a comment containing "tokens-ignore" and a reason.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src'];
const EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.scss', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'out', 'dist', 'public', 'design', '_docs']);
const SKIP_FILES = /(^|[\\/])tokens\.css$/;

const RULES = [
  ['raw hex colour', /#[0-9a-fA-F]{3,8}\b/],
  ['raw colour function', /\b(rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/],
  ['font family set directly', /font-family\s*:|fontFamily\s*:|['"](Space Grotesk|IBM Plex Sans|IBM Plex Mono|Inter|Roboto|Arial|Helvetica)['"]/],
  ['px type value', /\b(font-size|line-height|letter-spacing|fontSize|lineHeight|letterSpacing)\s*:\s*['"]?-?\d+(\.\d+)?(px|rem|em)/],
  ['px spacing or radius', /\b(padding|margin|gap|row-gap|column-gap|rowGap|columnGap|border-radius|borderRadius)(-?[a-zA-Z]*)?\s*:\s*['"]?[^;'"}]*?\b([3-9]|\d{2,})(\.\d+)?px/],
  ['Tailwind arbitrary value', /\b[a-z][\w-]*-\[(#|-?\d+(\.\d+)?(px|rem|em)\b|rgb|hsl|oklch)/],
  ['Tailwind default palette', /\b(bg|text|border|ring|fill|stroke|from|to|via|outline|divide|placeholder)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/],
];

function* files(dir) {
  // Accept file paths too, so lint-staged can check only the staged files.
  if (statSync(dir, { throwIfNoEntry: false })?.isFile()) { if (EXT.has(extname(dir)) && !SKIP_FILES.test(dir)) yield dir; return; }
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(name)) yield* files(path); }
    else if (EXT.has(extname(name)) && !SKIP_FILES.test(path)) yield path;
  }
}

let problems = 0;
for (const root of roots) {
  for (const file of files(root)) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes('tokens-ignore')) return;
      for (const [name, re] of RULES) {
        for (const m of line.matchAll(new RegExp(re.source, 'g'))) {
          problems++;
          console.log(`${relative(process.cwd(), file)}:${i + 1}  ${name}: "${m[0]}"  →  use a token from src/styles/tokens.css`);
        }
      }
    });
  }
}
if (problems) {
  console.log(`\n${problems} raw value(s) found. Replace them with design tokens (see AGENTS.md).`);
  process.exit(1);
}
console.log('check:tokens: no raw visual values found.');
