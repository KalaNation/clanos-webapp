# Building a screen

Every screen already has a route with a placeholder. This guide takes one from placeholder to done, using the clan directory (D18/M18) as the example.

## 1. Read the design

- Find the screen in [HANDOFF.md](../design/HANDOFF.md): its route, role, D##/M## numbers and any open decisions.
- Open both frames in [Figma](https://www.figma.com/design/VaNvrVo01bCgLfUnnF1Fvd/CLANOS): `D18 · Clan directory` (desktop, 1440px) and `M18` (mobile, 390px). The same number is the same screen. Related frames (M19, the filters sheet) are listed in the page's comment.
- Check the component names in HANDOFF.md (ClanHeader, MemberTable / MemberCard, …) and use them.

## 2. Branch

```sh
git switch dev && git pull
git switch -c feat/clan-directory
```

## 3. Create the feature

```text
src/features/clans/
  components/clan-card.tsx            the UI, built mobile-first from tokens
  components/clan-card.stories.tsx    one story per variant and state
  components/clan-card.test.tsx       its behaviour
  schemas/clan.ts                     Zod schemas for API responses and forms
  index.ts                            export only what other code needs
```

- **Components** use the primitives in `src/components/ui` and token classes only (`bg-s1`, `t-body`, `p-card`). Base classes are the mobile design; add `md:` for desktop. Tables become cards and dialogs become bottom sheets below 768px.
- **Every component** gets a story and a test; `pnpm check:stories` fails otherwise. Cover the four data states from D45: loading (skeleton, never a spinner), empty, error and data.
- **Status** always pairs a glyph with a colour; use `Badge`.
- **View state** that should survive a reload (filters, tabs, pages) goes in the URL; validate it with the feature's Zod schema. See [ADR 0002](../adr/0002-state-management.md).
- **Data from the API**: the first feature that needs it adds the API client, TanStack Query and MSW mocks (see [ADR 0001](../adr/0001-stack.md)). Keep calls and query hooks in `features/<feature>/api/`.

## 4. Wire up the page

Replace the placeholder, keeping the screen comment:

```tsx
// D18/M18 · Clan directory · M19 · Filters sheet
import type { Metadata } from 'next';

import { ClanDirectory } from '@/features/clans';

export const metadata: Metadata = { title: 'Clan directory' };

export default function ClansPage() {
  return <ClanDirectory />;
}
```

## 5. Check it

```sh
pnpm dev            # compare with the D18/M18 frames at 1440px and 390px
pnpm storybook      # check every state and the Accessibility panel
pnpm validate       # what CI runs, minus Playwright
```

Add a Playwright test in `e2e/` for important flows (sign in, apply to a clan, invite a member).

## 6. Open the pull request

```sh
git push -u origin feat/clan-directory
gh pr create --base dev --title "feat(clans): add the clan directory"
```

Fill in every section of the template, with desktop and mobile screenshots next to the Figma frames. Then ask a code owner for review.
