# CLANOS documentation

Everything about how the web app is built and why. The rules every change follows are in [AGENTS.md](../AGENTS.md); the day-to-day workflow is in [CONTRIBUTING.md](../CONTRIBUTING.md).

| Folder                         | What's in it                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------- |
| [architecture/](architecture/) | How the app fits together: routing, rendering, security, state, testing.      |
| [adr/](adr/)                   | Architecture decision records: what was decided, when and why.                |
| [design/](design/)             | The design reference: screen inventory, tokens, D##/M## previews, Figma link. |
| [guides/](guides/)             | Step-by-step guides for common work.                                          |

Start here:

- New to the codebase: [architecture/overview.md](architecture/overview.md)
- Building a screen: [guides/building-a-screen.md](guides/building-a-screen.md)
- Why a tool was chosen: [adr/0001-stack.md](adr/0001-stack.md)
- Where state goes: [adr/0002-state-management.md](adr/0002-state-management.md)
- Branches and releases: [adr/0003-branching.md](adr/0003-branching.md)

## Adding to the docs

- Explaining how something works today → `architecture/`.
- Recording a decision and its reasons → a new ADR in `adr/` (see [adr/README.md](adr/README.md)).
- Walking someone through a task → `guides/`.
- Design material → `design/`. The full design package, and the generator for the tokens and previews, live outside this repository.

Keep pages short and current: when a change makes a page wrong, fix the page in the same pull request.
