# Architecture decision records

An ADR records one decision: the situation, what was chosen, and what follows from it. When someone asks "why is it like this?", the answer should be here.

| ADR                                                 | Decision                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| [0001 · Stack](0001-stack.md)                       | The tools and versions, and why each one                          |
| [0002 · State management](0002-state-management.md) | Where each kind of state lives                                    |
| [0003 · Branching](0003-branching.md)               | `dev` and `main`, squash merges into `dev`, release PRs to `main` |

## Writing one

1. Copy the template below to `NNNN-short-title.md`, using the next number.
2. Keep it to a page. Say what was decided, not how it's implemented.
3. Open it in its own `docs(adr): …` pull request, or in the pull request that makes the change.
4. Never rewrite an accepted ADR. To change a decision, write a new ADR that supersedes it, and set the old one's status to `Superseded by NNNN`.

```markdown
# NNNN · Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context

What's the situation, and what forces a decision?

## Decision

What we'll do.

## Consequences

What gets easier, what gets harder, and what we'll have to watch.
```
