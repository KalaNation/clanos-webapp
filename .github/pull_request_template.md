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

<!-- Desktop at 1440px and mobile at 390px, next to the matching previews in _docs/design/previews. -->

| Desktop (1440px) | Mobile (390px) |
| ---------------- | -------------- |
|                  |                |

## Security considerations

<!-- Auth, permissions, input validation, secrets, headers, data shown to users, and any new
     dependency with the reason for it (AGENTS.md section 7). Write "None" if there are none. -->

## Checklist

- [ ] Design tokens only: no raw colours, sizes or fonts (`pnpm check:tokens`)
- [ ] Accessible: keyboard and screen reader work, labels present, 44px targets, status uses a glyph
- [ ] Every new or changed component has a story and a test (`pnpm check:stories`)
- [ ] Tests added or updated, and `pnpm validate` passes
- [ ] Matches the D## and M## previews at 1440px and 390px
- [ ] Docs updated where behaviour or conventions changed (AGENTS.md, `_docs/`, README)
- [ ] Targets `dev` (or is a release PR from `dev` into `main`)
