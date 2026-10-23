# 0001 · Stack

- **Status:** Accepted; dependency updates amended by [0006](0006-manual-dependency-updates.md)
- **Date:** 2026-10-23

## Context

CLANOS needs a web app that a team can build on for years: fast for players on mobile, strict about the design system, secure by default and easy to keep consistent. The API is a separate backend. Versions below are the latest stable releases on the date above; where the latest wasn't usable, the reason is given.

## Decision

### Runtime and framework

- **Node.js 24 LTS (24.22.1).** The current LTS line. Pinned in `.nvmrc`, `engines` and `devEngines.runtime`, so pnpm downloads it for this project and nobody needs a version manager. Revisit when Node 26 becomes LTS.
- **pnpm 12.** Fast, strict about phantom dependencies, and safe by default: new releases wait 24 hours (`minimumReleaseAge`), and dependency build scripts need approval (`allowBuilds`). Direct dependencies are pinned exactly (`saveExact`), so every upgrade is a reviewable Dependabot pull request.
- **Next.js 16 (App Router).** Server Components keep JavaScript off the client by default, and file-based routes map one-to-one to the HANDOFF screen inventory. `proxy.ts` gives one place for sign-in redirects and security headers. Cache Components / partial prerendering stay off, because a nonce-based CSP needs every page rendered per request.
- **React 19.**
- **Environment variables** are read from `process.env` where they're needed and documented in `.env.example`, with safe defaults. There's deliberately no validation layer, to keep the scaffold small; add one (for example a Zod schema checked at server start) if misconfiguration starts to bite.
- **TypeScript 6.0**, `strict` with `noUncheckedIndexedAccess`, `noImplicitOverride` and `noFallthroughCasesInSwitch`. **Not 7.0:** TypeScript 7 is the native Go compiler with no stable JavaScript API yet, and typescript-eslint supports TypeScript below 6.1. Dependabot holds TypeScript on 6.0.x until that changes.

### UI

- **Tailwind CSS 4**, through PostCSS rather than Next's Turbopack loader, so Storybook can use it too. Its default palette, type scale, radii, shadows and numeric spacing are switched off; only design-token utilities exist.
- **shadcn/ui on Base UI.** We own the component code and rewrite it against the tokens. Base UI is shadcn's default since July 2026 and is actively developed. Forms use shadcn's `Field`, which replaced its `Form`. Class merging uses `cn`, configured to know the token class names.
- **next/font** for Space Grotesk, IBM Plex Sans and IBM Plex Mono: self-hosted, no layout shift, no third-party font requests.
- **Storybook 10** (`@storybook/nextjs-vite`) with autodocs and the a11y addon. Every component is documented by its stories, and the Vitest addon runs every story as a test in Chromium with an axe check.

### Forms and state

- **React Hook Form + Zod 4** through `zodResolver`. One schema validates on the client and on the server.
- **Zustand 5** for the little UI state that distant components share ([ADR 0002](0002-state-management.md)).
- **Planned, added with the first API feature:** TanStack Query for server state, axios behind a single client in `src/lib/api/client.ts` (CSRF header, request ids, typed errors, one 401 handler, no token storage), and MSW to mock the API in development and tests.

### Quality

- **ESLint 10** (flat config): Next's core-web-vitals, typescript-eslint `strict-type-checked` and `stylistic-type-checked`, react-hooks, jsx-a11y (strict), simple-import-sort, eslint-comments with `require-description`, a 100-character comment limit, and import boundaries (no axios outside `src/lib/api`, no deep imports between features). ESLint 9 is end of life. Three plugins bundled with Next (react, import, jsx-a11y) don't list ESLint 10 in their peer ranges yet but work with it; `pnpm-workspace.yaml` allows that explicitly.
- **Prettier** with the Tailwind plugin owns formatting; `eslint-config-prettier` keeps the two from conflicting.
- **Custom checks** in `scripts/`: design tokens only, comments of 3 lines or fewer with no TODO lacking an issue, and a story and test for every component.
- **Vitest 5 + React Testing Library**, and **Playwright** at the two design widths.
- **Husky + lint-staged + commitlint** run the checks before code leaves a laptop. CI runs them again, plus CodeQL, dependency review and gitleaks.

## Consequences

- The design system can't drift: raw values don't compile into utilities, and the checks catch the rest.
- Every component has documentation and an accessibility check from day one, at the cost of writing a story and a test for each.
- Security headers, the CSP and environment validation are in place before any feature exists.
- Two version holds need watching: TypeScript 7 (when typescript-eslint supports it) and ESLint 10 peer ranges (when Next's bundled plugins catch up).
- Per-request rendering trades static caching for a strict CSP; revisit if a page needs to be static, for example with Next's SRI support instead of nonces.
