import { createCn } from 'cn/config';

import { SPACING_KEYS, TEXT_STYLES } from './theme';

/**
 * Joins class names and resolves Tailwind conflicts. It knows the CLANOS spacing keys and
 * `t-*` text styles, so `cn('p-sp-16', 'p-sp-8')` keeps only `p-sp-8`.
 */
export const cn = createCn({
  extend: {
    theme: { spacing: [...SPACING_KEYS] },
    classGroups: { 'text-style': [{ t: [...TEXT_STYLES] }] },
  },
});
