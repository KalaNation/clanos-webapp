# Contributing to CLANOS

Read [AGENTS.md](AGENTS.md) first: it holds the coding rules. This guide covers how a change gets from your machine into `main`.

## Setup

Follow the quick start in the [README](README.md#quick-start). `pnpm install` installs the Git hooks, which run on every commit and push.

## How a change lands

```text
feat/clan-directory ──PR (squash)──▶ dev ──release PR (merge commit)──▶ main
```

1. **Branch from `dev`.** `git switch dev && git pull && git switch -c feat/clan-directory`
2. **Commit** in small, logical steps with Conventional Commit messages. The pre-commit hook fixes and checks the files you staged; the commit-msg hook checks the message.
3. **Push** your branch. The pre-push hook rejects pushes to `main` or `dev` and badly named branches, then typechecks.
4. **Open a pull request into `dev`**: `gh pr create --base dev`. Fill in every section of the template.
5. **CI runs**: `validate` (format, lint, typecheck, the token, comment and story checks, unit and Storybook tests, build and Playwright), `pr-title`, `branch-name`, `docs`, `codeql`, `dependency-review` and `gitleaks`. All of them must pass.
6. **Review**: one approval from a code owner (see `.github/CODEOWNERS`), with every conversation resolved. A new push dismisses earlier approvals. You can't approve or merge your own pull request. While the team has a single reviewer, repository admins can merge without an approval; GitHub logs every bypass ([ADR 0005](_docs/adr/0005-admin-bypass.md)).
7. **Squash-merge.** The PR title becomes the single commit on `dev`, and GitHub deletes the branch.

**Releases** are pull requests from `dev` into `main`, merged with a merge commit so the two branches never diverge. Nobody, admins included, can push to `dev` or `main` directly; the repository rulesets enforce this. `scripts/setup-github.sh` describes them and can re-apply them.

## Naming

| What                | Rule                                                                                | Examples                                                                     |
| ------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Branch              | `<type>/<short-description>`, lowercase, hyphens, optional issue number             | `feat/clan-directory`, `fix/123-invite-expiry`, `chore/update-deps`          |
| Commit and PR title | Conventional Commit, scope = feature folder, lowercase subject                      | `feat(clans): add directory filters`, `fix(members): keep the tab on reload` |
| Files               | kebab-case                                                                          | `clan-card.tsx`, `use-clans.ts`                                              |
| Components          | PascalCase, one per file, with `<name>.stories.tsx` and `<name>.test.tsx` beside it | `ClanCard` in `clan-card.tsx`                                                |
| Hooks               | start with `use`                                                                    | `useDrawerStore`                                                             |

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `style`, `revert`.

## Writing a good pull request

- **Keep it to one thing.** A screen, a fix or a refactor, not all three. Small pull requests get reviewed faster and more carefully.
- **Say why, not only what.** The diff shows what changed; the description explains the problem and the choice you made. Link the issue (`Closes #123`).
- **Name the screens** (D##/M##) and attach desktop (1440px) and mobile (390px) screenshots next to the matching D##/M## frames from [Figma](https://www.figma.com/design/VaNvrVo01bCgLfUnnF1Fvd/CLANOS).
- **Write test steps a reviewer can follow**: the URL, the role to use, what to click and what should happen.
- **Fill in the security section**: auth, permissions, validation, data shown to users, and the reason for every new dependency. Write "None" when there's nothing to say.
- **Reasoning longer than 3 lines** goes in the description or an ADR (`_docs/adr/`), not in a code comment.

## Documenting your change

Docs ship in the same pull request as the change (AGENTS.md section 9, [ADR 0004](_docs/adr/0004-documentation-is-enforced.md)):

- Architecture, tooling, security or config changes → update `_docs/`; a decision gets an ADR.
- Rule or workflow changes → update AGENTS.md, and README, CONTRIBUTING or SECURITY where they describe it.
- Component changes → update the component's stories, so Storybook shows what exists now.

Run `pnpm check:docs` before you push; the required `docs` check runs it in CI. If a change truly needs no docs, add a line such as `Docs: not needed — <reason>` (or `Stories: not needed — <reason>`) to the PR description.

## Requesting a design token

Tokens come from the CLANOS design package (`tools/tokens.py`), never from edits to `src/styles/tokens.css`.

1. Use the closest existing token and mark the spot: `/* TODO(token): 22px checkbox */`. Mention it in your pull request.
2. Open an issue labelled `design-token` with the value, where it's used, the D##/M## frames, and desktop and mobile values if they differ.
3. Once the design package has the token, run `tools/rebuild.sh .` there, then copy `tokens/tokens.css` to `src/styles/tokens.css` and `tokens/tokens.json` to `_docs/design/tokens.json`.
4. Map the new token in `src/app/globals.css` (and in `src/lib/theme.ts` if it's a spacing key or text style), replace the `TODO(token)` comments, and open a `chore(design): …` pull request.

## Adding a dependency

Every new dependency needs a reason in the pull request. Prefer well-maintained packages, and don't add one for something a few lines can do. Versions are pinned exactly; Dependabot proposes updates every Monday.
