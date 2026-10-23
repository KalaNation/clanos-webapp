/** Names of the CLANOS text styles; each one is a `t-<name>` utility in globals.css. */
export const TEXT_STYLES = [
  'display',
  'h1',
  'h2',
  'h3',
  'stat',
  'wordmark',
  'body',
  'body-strong',
  'ui',
  'caption',
  'input',
  'count',
  'label',
  'field-label',
  'badge',
  'data',
  'data-strong',
  'code',
  'micro',
] as const;

/** Spacing keys mapped from tokens: `p-sp-16`, `gap-section`, `h-control`, `w-side-panel`, … */
export const SPACING_KEYS = [
  'sp-4',
  'sp-6',
  'sp-8',
  'sp-10',
  'sp-12',
  'sp-16',
  'sp-20',
  'sp-24',
  'sp-28',
  'sp-32',
  'gutter',
  'section',
  'list',
  'card',
  'control',
  'control-sm',
  'touch',
  'top-bar',
  'side-panel',
  'bottom-bar',
  'frame',
] as const;

export type TextStyle = (typeof TEXT_STYLES)[number];
export type SpacingKey = (typeof SPACING_KEYS)[number];
