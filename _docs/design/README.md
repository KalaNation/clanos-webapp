# Design reference

- **Figma:** [CLANOS](https://www.figma.com/design/VaNvrVo01bCgLfUnnF1Fvd/CLANOS)
- **[HANDOFF.md](HANDOFF.md):** the screen inventory (routes, roles, D##/M## numbers), the tokens, the mobile patterns, the components to build, and the decisions still open.
- **Frames:** every screen is in the Figma file, on the Desktop and Mobile pages, named like `D26 · Clan dashboard / Clan Master` and `M26 · …`. D frames are 1440px wide and M frames 390px. **The same number is the same screen.** D45 and M45 are the Foundations frames: every component and variant.
- **[tokens.json](tokens.json):** the tokens in DTCG format, for Tokens Studio and Style Dictionary.

## Where this comes from

The CLANOS design package (shared separately) is the source of truth. Its `tools/tokens.py` defines every token, and `tools/rebuild.sh` regenerates the HTML frames and their screenshots, `tokens.json`, `tokens.css`, the Figma plugin and HANDOFF.md from it. This folder holds a copy of the reference material only; don't edit it by hand.

## How tokens reach the code

```text
tools/tokens.py ──rebuild──▶ tokens.css ──copy──▶ src/styles/tokens.css
                                                        │
                                   src/app/globals.css maps them into Tailwind:
                                   bg-s1, text-mut, p-sp-16, rounded-lg, t-h1, …
```

1. `tokens.css` defines CSS variables (`--s1`, `--sp-16`, `--t-h1`, …). Layout and type values switch below 768px; colours, space and radius never change.
2. `globals.css` imports it into its own cascade layer, so the `next/font` variables on `<html>` win over the plain font names.
3. `@theme inline` maps each token to a Tailwind utility and switches Tailwind's defaults off. The `t-<name>` text styles are `@utility` rules.
4. `pnpm check:tokens` fails on any raw colour, size, font or arbitrary value.

To change or add a token, follow [Requesting a design token](../../CONTRIBUTING.md#requesting-a-design-token).

## Values without a token yet

The components use the closest token where the design has a value with no token, marked `TODO(token)` in the code. Add these to `tools/tokens.py`:

| Value in the design                         | Used now                    | Where                      |
| ------------------------------------------- | --------------------------- | -------------------------- |
| 22px checkbox and radio, 1.5px border       | 20px, 2px                   | `checkbox.tsx`, `radio-group.tsx` |
| Badge padding 5 × 7                         | 4 × 6                       | `badge.tsx`                |
| Small button text 13px on mobile            | `t-ui` (14px)               | `button.tsx`               |
| Section tab gap 22px                        | 20px                        | `tabs.tsx`                 |
| Desktop dialog width 500px                  | 512px (`max-w-lg`)          | `dialog.tsx`               |
| Sheet grabber 36 × 5                        | 32 × 4                      | `dialog.tsx`, `sheet.tsx`  |
| Avatars 26, 36, 40, 60 and 72px             | 28, 32, 44                  | `avatar.tsx`               |
| Logo placeholder stripes 5px                | 6px                         | `globals.css`              |

## Open questions from the design

HANDOFF.md lists decisions to review. One affects the code: M45 says 768–1023px (tablet, not designed) should use the mobile layout, with the desktop sidebar from 1024px. The tokens and AGENTS.md switch at 768px, and the code follows them.
