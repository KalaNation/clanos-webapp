# 0002 · State management

- **Status:** Accepted
- **Date:** 2026-10-23

## Context

CLANOS screens hold several kinds of state: data from the API (clans, members, invitations), view state that should survive a reload or a shared link (a members tab, directory filters), UI state that distant components share (the mobile drawer), and state that belongs to one component (whether a menu is open).

Putting all of it in one place goes wrong in predictable ways. Server data copied into a global store goes stale and disagrees with the cache. Filters kept in memory are lost on reload and can't be shared. A Context that changes often re-renders everything below it.

## Decision

Each kind of state has one home.

| State                | Where it lives                          | Examples                                                             | Never                                      |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| Server data          | TanStack Query                          | clan list, member list, a clan profile                               | Copied into Zustand, Context or `useState` |
| Shareable view state | The URL: route params and search params | `?tab=invitations`, directory filters, pagination, `/clans/[clanId]` | Held only in memory                        |
| Shared UI state      | Zustand, one small store per concern    | mobile drawer open, active clan id                                   | Server data, tokens, anything secret       |
| Local UI state       | `useState` / `useReducer`               | an input's draft value, a dialog whose trigger sits next to it       | Lifted into a store "just in case"         |
| Form state           | React Hook Form + Zod                   | sign-in, create clan, invite members                                 | Mirrored into a store                      |
| App-wide services    | Context, providers only                 | `TooltipProvider`, `NonceProvider`, later `QueryClientProvider`      | Values that change often                   |

Auth tokens are not state: the API keeps the session in httpOnly cookies, and the client never stores a token (AGENTS.md section 7).

### Choosing where new state goes

1. Does it come from the API? → **TanStack Query.**
2. Should a reload, the back button or a shared link restore it? → **The URL.**
3. Do components far apart in the tree need it? → **Zustand.**
4. Otherwise → **local state.**

### Conventions

- **Zustand.** One store per concern, named `use<Concern>Store`, in `features/<feature>/store.ts` (or next to the layout component that owns it, like `src/components/layout/drawer-store.ts`). Actions live in the store. Components subscribe to a slice, `useDrawerStore((state) => state.isOpen)`, so they re-render only when that slice changes. Tests reset a store with `useXStore.setState(...)`.
- **TanStack Query.** Not installed yet: the first feature that reads from the API adds it, with its `QueryClientProvider` in `src/lib/app-providers.tsx`. From then on, each feature keeps a query-key factory and its `queryOptions` / hooks in `features/<feature>/api/`, and mutations invalidate the keys they change. Don't retry 4xx responses (except 408 and 429); they won't succeed on a second try.
- **URL state.** Read it with `useSearchParams` / route params, and validate it with the feature's Zod schema before use; a hand-edited URL is user input.

## Consequences

- Server data has one source of truth, with caching, refetching and deduplication handled by TanStack Query instead of hand-written effects.
- Views can be shared and reloaded, which the designs rely on (for example D32 opens with `?tab=invitations`).
- Zustand stays small, so a re-render traced to a store is easy to find.
- New contributors have a short rule to follow, and reviewers can point to this ADR when state lands in the wrong place.
