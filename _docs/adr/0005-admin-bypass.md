# 0005 · Admin bypass while the team has one reviewer

- **Status:** Accepted
- **Date:** 2026-10-23
- **Amends:** [0003 · Branching](0003-branching.md), which allowed no bypass

## Context

The repository now belongs to the `useKalaNation` organization, owned by KalaNation and iamBlissMedik. Until more people join, every pull request needs the other owner account to approve it: GitHub never lets authors approve their own pull requests, and the `dev` and `main` rulesets require one approval with no bypass. That makes every merge wait on one specific account.

## Decision

- Both rulesets let **repository admins bypass them for pull requests only** (`bypass_mode: pull_request`). An admin can merge a pull request that has no approval, or whose checks haven't finished.
- **Direct pushes, force pushes and deleting `dev` or `main` stay blocked for everyone**, admins included. Every change still arrives through a pull request.
- Use the bypass only when no other reviewer is available, and wait for CI to pass first. GitHub records every bypass in the repository's rule insights.
- **Coding agents never use it** (AGENTS.md section 8).
- `scripts/setup-github.sh` applies it (`REPOSITORY_ADMIN_ROLE`).

## Consequences

- One person can keep shipping while the team is being formed.
- Review becomes optional for admins, so the discipline is social: wait for green checks, and ask for a review whenever someone else can give one.
- **Remove the bypass once a second code owner joins.** Delete `bypass_actors` in `scripts/setup-github.sh`, re-run it, and record that in an ADR that supersedes this one.
