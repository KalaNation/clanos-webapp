## What and why

<!-- What does this change, and why? Link the issue, e.g. "Closes #123". -->

## Type

<!-- Tick one. The PR title must be a Conventional Commit, e.g. "feat(clans): add directory filters";
     it becomes the squash commit on dev. -->

- [ ] feat: a new feature
- [ ] fix: a bug fix
- [ ] chore / build / ci: tooling, dependencies, pipelines
- [ ] docs: documentation only
- [ ] refactor / perf / style / test: no behaviour change for users
- [ ] revert

## Screens

<!-- The D##/M## frames this touches (see _docs/design/HANDOFF.md), or "None". -->

## How to test

<!-- Steps a reviewer can follow, with the URL and the role to use. -->

1.

## Screenshots

<!-- Desktop at 1440px and mobile at 390px, next to the matching D##/M## frames from Figma. -->

| Desktop (1440px) | Mobile (390px) |
| ---------------- | -------------- |
|                  |                |

## Security considerations

<!-- Auth, permissions, input validation, secrets, headers, data shown to users, and any new
     dependency with the reason for it (AGENTS.md section 7). Write "None" if there are none. -->

## Documentation

<!-- The docs check fails if architecture, tooling, security or config changed without a change in
     _docs/ or AGENTS.md / README / CONTRIBUTING / SECURITY, or if a component changed without its
     story. List what you updated. If nothing needed documenting, write a line starting with
     "Docs:" or "Stories:", then "not needed", then the reason (AGENTS.md section 9). -->

## Checklist

- [ ] Design tokens only: no raw colours, sizes or fonts (`pnpm check:tokens`)
- [ ] Accessible: keyboard and screen reader work, labels present, 44px targets, status uses a glyph
- [ ] Every new or changed component has an up-to-date story and a test (`pnpm check:stories`)
- [ ] Tests added or updated, and `pnpm validate` passes
- [ ] Matches the D## and M## frames in Figma at 1440px and 390px
- [ ] Docs updated for every architecture or convention change, with an ADR for a decision (`pnpm check:docs`)
- [ ] Targets `dev` (or is a release PR from `dev` into `main`)
