import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

const AXIOS_IMPORT = {
  name: 'axios',
  message:
    'Use the API client from @/lib/api; only src/lib/api may import axios (AGENTS.md section 5).',
};
// shadcn's registry imports cn from the package; ours also merges the CLANOS token classes.
const CN_IMPORT = {
  name: 'cn',
  message: "Import cn from '@/lib/utils', which knows the CLANOS spacing and text-style classes.",
};
const FEATURE_INTERNALS = {
  group: ['@/features/*/*'],
  message: "Import another feature through its index.ts ('@/features/<name>'), never its folders.",
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  reactHooks.configs.flat.recommended,
  // eslint-config-next already registers the jsx-a11y plugin, so only its rules are added here.
  { rules: jsxA11y.flatConfigs.strict.rules },
  comments.recommended,
  {
    rules: {
      '@eslint-community/eslint-comments/require-description': 'error',
      'react/no-danger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [AXIOS_IMPORT, CN_IMPORT],
          patterns: [{ group: ['axios/*'], message: AXIOS_IMPORT.message }, FEATURE_INTERNALS],
        },
      ],
    },
  },
  {
    files: ['src/lib/api/**'],
    rules: {
      'no-restricted-imports': ['error', { paths: [CN_IMPORT], patterns: [FEATURE_INTERNALS] }],
    },
  },
  // CLI scripts report their results on stdout.
  { files: ['scripts/**'], rules: { 'no-console': 'off' } },
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: { 'simple-import-sort/imports': 'error', 'simple-import-sort/exports': 'error' },
  },
  ...storybook.configs['flat/recommended'],
  prettier,
  // Must follow eslint-config-prettier, which turns max-len off; Prettier owns code length.
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/max-len': [
        'error',
        { code: Number.MAX_SAFE_INTEGER, comments: 100, ignoreUrls: true },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'storybook-static/**',
    'playwright-report/**',
    'test-results/**',
    '_docs/**',
    'next-env.d.ts',
    'public/mockServiceWorker.js',
  ]),
]);
