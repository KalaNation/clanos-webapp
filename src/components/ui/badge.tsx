import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type Tone = 'ok' | 'warn' | 'bad' | 'info' | 'brand' | 'mut';

interface BadgeSpec {
  glyph?: string;
  label: string;
  tone: Tone;
}

/** Every badge on D45/M45. Status badges carry a glyph: status is never shown by colour alone. */
const BADGES = {
  active: { glyph: '●', label: 'Active', tone: 'ok' },
  pending: { glyph: '◐', label: 'Pending', tone: 'warn' },
  suspended: { glyph: '▲', label: 'Suspended', tone: 'bad' },
  removed: { glyph: '○', label: 'Removed', tone: 'mut' },
  accepted: { glyph: '✓', label: 'Accepted', tone: 'ok' },
  declined: { glyph: '✕', label: 'Declined', tone: 'bad' },
  expired: { glyph: '⏳', label: 'Expired', tone: 'mut' },
  revoked: { glyph: '⊘', label: 'Revoked', tone: 'bad' },
  unverified: { glyph: '◐', label: 'Unverified', tone: 'warn' },
  locked: { glyph: '▲', label: 'Locked', tone: 'bad' },
  draft: { label: 'Draft', tone: 'mut' },
  scheduled: { label: 'Scheduled', tone: 'info' },
  published: { label: 'Published', tone: 'ok' },
  pinned: { label: 'Pinned', tone: 'brand' },
  archived: { label: 'Archived', tone: 'mut' },
  open: { label: 'Open', tone: 'ok' },
  invite: { label: 'Invite', tone: 'warn' },
  closed: { label: 'Closed', tone: 'mut' },
} as const satisfies Record<string, BadgeSpec>;

type BadgeVariant = keyof typeof BADGES;

const badgeVariants = cva(
  // TODO(token): the design pads badges 5px × 7px; the nearest space tokens are used.
  'inline-flex w-fit shrink-0 items-center gap-sp-4 rounded-xs border border-bd bg-s2 px-sp-6 py-sp-4 t-badge whitespace-nowrap',
  {
    variants: {
      tone: {
        ok: 'text-ok',
        warn: 'text-warn',
        bad: 'text-bad',
        info: 'text-info',
        brand: 'text-brand',
        mut: 'text-mut',
      } satisfies Record<Tone, string>,
    },
  },
);

type BadgeProps = useRender.ComponentProps<'span'> & { variant: BadgeVariant };

/** A status, announcement or recruitment badge. The label defaults to the design's wording. */
function Badge({ className, variant, render, children, ...props }: BadgeProps) {
  const badge: BadgeSpec = BADGES[variant];
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ tone: badge.tone }), className),
        children: (
          <>
            {badge.glyph ? <span aria-hidden="true">{badge.glyph}</span> : null}
            {children ?? badge.label}
          </>
        ),
      },
      props,
    ),
    render,
    state: { slot: 'badge', variant },
  });
}

export { Badge, type BadgeProps, BADGES, type BadgeVariant, badgeVariants };
