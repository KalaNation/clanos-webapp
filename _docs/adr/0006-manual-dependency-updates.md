# 0006 · Manual dependency updates

- **Status:** Accepted
- **Date:** 2026-10-23
- **Amends:** [0001 · Stack](0001-stack.md), which relied on Dependabot for upgrades

## Context

Dependabot opened weekly version-update pull requests. They arrive whether or not anyone has time to review them, and they don't know the project's constraints: its first pull request moved `@types/node` to 26 on a Node 24 app.

## Decision

- **No Dependabot version updates**: there is no `.github/dependabot.yml`.
- **Upgrades are deliberate pull requests** on a `chore/update-deps` branch, following [CONTRIBUTING.md](../../CONTRIBUTING.md#updating-dependencies): `pnpm outdated`, upgrade a few related packages at a time, read major-version changelogs, run `pnpm validate` and the end-to-end tests.
- **The holds stay:** TypeScript on 6.0.x until typescript-eslint supports 7, and `@types/node` on the Node major in `.nvmrc`.
- **Security stays covered:** Dependabot alerts (Security tab notifications, no pull requests) and the dependency graph stay on, and the required `dependency-review` check still blocks pull requests that add a known vulnerability.

## Consequences

- No unrequested pull requests; every upgrade has an author who understood it.
- Upgrades only happen if someone does them. Plan one dependency pass a month, and one before each release from `dev` to `main`.
- Known vulnerabilities still surface through alerts and at review time, but fixing them is manual.
