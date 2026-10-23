# 0004 · Documentation is enforced

- **Status:** Accepted
- **Date:** 2026-10-23

## Context

CLANOS is a scaffold that many developers, and coding agents, will build on. Docs that drift from the code are worse than none: people trust them and get it wrong. Reminders in a checklist get skipped under deadline pressure, and agents only follow rules they can see.

## Decision

Documentation ships in the same pull request as the change, and CI enforces it.

- **The rule** is AGENTS.md section 9, which every coding agent reads (CLAUDE.md points Claude Code to it): architecture, tooling, security or configuration changes update `_docs/`, decisions get an ADR, rule changes update AGENTS.md / README / CONTRIBUTING / SECURITY, and changed components update their stories.
- **The check** is `scripts/check-docs.mjs`, run as the required `docs` job on every pull request into `dev` (and locally as `pnpm check:docs`). It fails when:
  - files that define the architecture change (proxy, security, env, layouts, theme, tooling and CI config, scripts, added or removed dependencies, scripts or runtimes, new modules in `src/lib`) and nothing under `_docs/`, AGENTS.md, README, CONTRIBUTING or SECURITY changes;
  - a component changes and its `.stories.tsx` doesn't.
- **The escape hatch** is explicit and reviewed: a line in the PR description such as `Docs: not needed — <reason>` or `Stories: not needed — <reason>`. A missing or placeholder reason doesn't count.
- **Skipped:** release pull requests into `main` (their changes were documented on the way into `dev`) and Dependabot's version bumps.
- **Component docs** come from Storybook: autodocs builds each page from the stories and the component's TypeScript types, so the props table can't drift; the stories show the variants and states.

## Consequences

- Docs stay current because a pull request can't merge without them, or without a stated reason.
- The check is path-based, so it can't judge quality: reviewers still check that the docs are right, and that a waiver's reason holds.
- Some small pull requests need a one-line waiver. That cost is deliberate: it makes "no docs" a visible decision.
- When the architecture grows (a new top-level folder, a new kind of config), add its paths to `scripts/check-docs.mjs` in the same pull request.
