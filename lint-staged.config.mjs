// Runs on staged files before every commit. Fixers run first; the checks then see the fixed files.
const CODE = '*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}';

const config = {
  [CODE]: ['eslint --fix --max-warnings=0 --no-warn-ignored', 'prettier --write --ignore-unknown'],
  '*.{css,md,mdx,json,yaml,yml}': 'prettier --write --ignore-unknown',
  'src/**/*.{ts,tsx,js,jsx,mjs,css,mdx}': 'node scripts/check-tokens.mjs',
  '*.{ts,tsx,mts,cts,js,jsx,mjs,cjs,css}': 'node scripts/check-comments.mjs',
  'src/**/*.tsx': 'node scripts/check-stories.mjs',
};

export default config;
