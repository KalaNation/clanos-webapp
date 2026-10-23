# CLANOS: Figma handoff

CLANOS ("Clan Operating System") is an app for running gaming clans, starting with Call of Duty: Mobile. This folder contains the full MVP design: **40 desktop frames (1440px)** and **44 mobile frames (390px)**, all built from **one shared set of design tokens**.

Some frames come from the original concept prototype (`source/CLANOS Concept.html`). The rest were designed to complete the MVP: auth, onboarding, profile, teams, rules, settings and every mobile screen. The inventory below marks which is which.

**Numbering:** desktop **D26** and mobile **M26** are the same screen. A missing number on one platform means that screen only exists on the other (for example, Alerts is mobile only).

## What's in this folder

| Path | What it is |
|---|---|
| `index.html` | Contact sheet of every frame, grouped by Figma page. Start here. |
| `desktop/d01-…d45-….html` | One desktop screen per file, 1440px wide. |
| `mobile/m01-…m45-….html` | One mobile screen per file, 390px wide. |
| `desktop/board-*.html`, `mobile/board-*.html` | **Import boards**: three per platform (Auth & Onboarding, App screens, Foundations), so the whole set takes 6 imports instead of 84. |
| `*/previews/*.png` | Pixel-accurate screenshots for reference and QA. |
| `tokens/tokens.json` | The token set in DTCG format: `core` + `desktop` + `mobile` sets with Desktop and Mobile themes. Works with Tokens Studio and Style Dictionary. |
| `tokens/tokens.css` | The same tokens as CSS custom properties for developers. Mobile values apply below 768px. |
| `nextjs-starter/` | For building the app: `AGENTS.md` (rules every coding agent follows: tokens only), `CLAUDE.md`, and `scripts/check-tokens.mjs`, which fails on any raw colour, size or font. |
| `figma-tokens-plugin/` | A small Figma plugin that creates the variables and text styles and links imported screens to them. |
| `start-server.command` | Double-click to serve the folder at `http://localhost:8137`. |
| `source/` | The original prototype. |

## Setting up the Figma file

Do these in order. Setting up tokens first means imported layers can be linked to tokens straight away.

### 1. Create the tokens in Figma (2 minutes)

1. Open the **Figma desktop app**. Development plugins don't run in the browser.
2. **Plugins → Development → Import plugin from manifest…** and choose `figma-tokens-plugin/manifest.json`.
3. Run **Plugins → Development → CLANOS tokens → 1. Create / update tokens**.

The plugin creates:
- **CLANOS · Color**: 25 colour variables, for example `surface/default` and `status/danger`. Each one has its CSS name (`var(--s1)`) set as code syntax, so Dev Mode shows developers the same name they use in code.
- **CLANOS · Space & radius**: `space/4` to `space/32` and `radius/xs` to `radius/full`.
- **CLANOS · Layout**: 12 variables with **Desktop** and **Mobile** modes, such as gutter, control height and top bar height. The free Figma plan allows only one mode per collection, so on that plan the plugin creates a second **Layout (Mobile)** collection instead.
- **Text styles**: `Desktop/<name>` and `Mobile/<name>`, 19 styles each.

The plugin is safe to run again: it updates existing items instead of duplicating them. It needs Space Grotesk, IBM Plex Sans and IBM Plex Mono, which are all available in Figma by default.

*Alternative:* load `tokens/tokens.json` into **Tokens Studio** and switch between the Desktop and Mobile themes.

### 2. Import the screens

Screens are converted into editable Figma layers with **html.to.design**: install the Figma plugin and the Chrome extension.

1. Double-click `start-server.command`. If macOS blocks it, right-click it and choose **Open**. The index opens at `http://localhost:8137`.
2. Open the **boards** in the order listed at the top of the index (6 in total). You can also open a single screen.
3. Capture the page with the html.to.design Chrome extension and import it with the Figma plugin, on the Figma page the index names.
4. A board arrives as one large frame with every screen and its label inside. Keep it as is, or select it and ungroup (⇧⌘G) to work with screens individually.

The free html.to.design plan allows about 10 imports every 30 days. The 6 boards cover everything with room for a retry; importing per screen would take 84.

### 3. Link the imported layers to the tokens

Select the imported frames, then run **CLANOS tokens → 2. Bind selection to tokens**.
- Every fill and stroke whose colour exactly matches a token is linked to that colour variable.
- Text whose family, weight and size match a style gets the `Desktop/…` or `Mobile/…` text style. Frames 480px wide or narrower get Mobile styles.

Anything left unlinked is a one-off value that should be snapped to the nearest token.

### 4. Organise the file

Figma Starter (the free plan) allows 3 pages per file, so the file uses one page per platform:

| Figma page | Boards to import there | Contains |
|---|---|---|
| **Desktop** | desktop Board 1 + Board 2 | D01–D44 |
| **Mobile** | mobile Board 1 + Board 2 | M01–M44 |
| **Foundations** | desktop Board 3 + mobile Board 3 | D45, M45, and later your components |

Inside each board, flows are separated by big green headings (Auth & Onboarding, Discover, Player, Clan, Admin & Navigation). Use the **Section tool (Shift+S)** to drag a section around each flow so the page stays easy to navigate. Sections don't count against the page limit.

On a paid plan you can switch to one page per flow (01 Auth & Onboarding … 06 Foundations), plus pages for components and reference PNGs.

Name frames as `D26 · Clan dashboard / Clan Master` and `M26 · Clan dashboard / Clan Master`. Board labels already use these names. On mobile, set the status bar, app bar, tab bar and action bars to **Fix position when scrolling**.

## Screen inventory

**Source:** *prototype* = captured from the original concept; *new* = designed to complete the MVP, in the same visual language and from the same tokens.

**01 Auth & Onboarding**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 01 | Sign in | D01 | M01 | `/sign-in` | Signed out | new |
| 02 | Sign in / Error | D02 | M02 | `/sign-in` | Signed out | new |
| 03 | Create account (step 1) | D03 | M03 | `/sign-up` | Signed out | new |
| 04 | Verify email | D04 | M04 | `/sign-up/verify` | Signed out | new |
| 05 | Forgot password | D05 | M05 | `/forgot-password` | Signed out | new |
| 06 | Forgot password / Link sent | D06 | M06 | `/forgot-password/sent` | Signed out | new |
| 07 | Set new password | D07 | M07 | `/reset-password/:token` | Signed out | new |
| 08 | Password updated | D08 | M08 | `/reset-password/done` | Signed out | new |
| 09 | Onboarding / 2 · Choose game | D09 | M09 | `/onboarding/game` | Member | new |
| 10 | Onboarding / 3 · Game profile (error) | D10 | M10 | `/onboarding/game-profile` | Member | prototype (D) · new (M) |
| 11 | Onboarding / 4 · Find a clan | D11 | M11 | `/onboarding/clans` | Member | new |
| 12 | Invitation / New user | D12 | M12 | `/invitations/:token` | Member | prototype (D) · new (M) |
| 13 | Invitation / Existing user | D13 | M13 | `/invitations/:token` | Member | new |
| 14 | Invitation / Accepted | D14 | M14 | `/invitations/:token` | Member | new |
| 15 | Invitation / Declined | D15 | M15 | `/invitations/:token` | Member | new |
| 16 | Invitation / Expired (blocked) | D16 | M16 | `/invitations/:token` | Member | new |
| 17 | Invitation / Wrong account (error) | D17 | M17 | `/invitations/:token` | Member | new |

**02 Discover**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 18 | Clan directory | D18 | M18 | `/clans` | Member | prototype (D) · new (M) |
| 19 | Clan directory / Filters sheet | — | M19 | `/clans` | Member | new |
| 20 | Clan profile | D20 | M20 | `/clans/nfo` | Member | prototype (D) · new (M) |
| 21 | Clan profile / Apply dialog · M: Clan profile / Apply sheet | D21 | M21 | `/clans/nfo` | Member | prototype (D) · new (M) |
| 22 | Create a clan | D22 | M22 | `/clans/new` | Member | new |

**03 Player**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 23 | Home / Player dashboard | D23 | M23 | `/dashboard` | Member | prototype (D) · new (M) |
| 24 | Alerts | — | M24 | `/alerts` | Member | new |
| 25 | Profile & game IDs | D25 | M25 | `/me` | Member | new |

**04 Clan**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 26 | Clan dashboard / Clan Master | D26 | M26 | `/clans/rvnt` | Clan Master | prototype (D) · new (M) |
| 27 | Clan dashboard / Staff | D27 | — | `/clans/rvnt` | Staff | prototype |
| 28 | Clan dashboard / Member | D28 | M28 | `/clans/rvnt` | Member | prototype (D) · new (M) |
| 29 | Members / All | D29 | M29 | `/clans/rvnt/members` | Clan Master | prototype (D) · new (M) |
| 30 | Members / Member view | D30 | M30 | `/clans/rvnt/members` | Member | prototype (D) · new (M) |
| 31 | Members / Member actions sheet | — | M31 | `/clans/rvnt/members` | Clan Master | new |
| 32 | Members / Invitations | D32 | M32 | `/clans/rvnt/members?tab=invitations` | Clan Master | prototype (D) · new (M) |
| 33 | Members / Invite dialog · M: Members / Invite sheet | D33 | M33 | `/clans/rvnt/members?tab=invitations` | Clan Master | prototype (D) · new (M) |
| 34 | Recruitment / Queue + applicant · M: Recruitment / Queue | D34 | M34 | `/clans/rvnt/recruitment` | Clan Master | prototype (D) · new (M) |
| 35 | Recruitment / Applicant | — | M35 | `/clans/rvnt/recruitment/:id` | Clan Master | new |
| 36 | Staff & roles | D36 | M36 | `/clans/rvnt/staff` | Clan Master | prototype (D) · new (M) |
| 37 | Announcements / Feed | D37 | M37 | `/clans/rvnt/announcements` | Member | new |
| 38 | Announcements / Composer | D38 | M38 | `/clans/rvnt/announcements` | Clan Master | prototype (D) · new (M) |
| 39 | Teams | D39 | M39 | `/clans/rvnt/teams` | Clan Master | new |
| 40 | Rules | D40 | M40 | `/clans/rvnt/rules` | Clan Master | new |
| 41 | Clan settings | D41 | M41 | `/clans/rvnt/settings` | Clan Master | new |
| 42 | Clan settings / Delete dialog · M: Clan settings / Delete confirmation | D42 | M42 | `/clans/rvnt/settings` | Clan Master | new |

**05 Admin & Navigation**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 43 | Navigation drawer | — | M43 | `—` | Clan Master | new |
| 44 | Admin / Users | D44 | M44 | `/admin/users` | Admin | prototype (D) · new (M) |

**06 Foundations**

| # | Screen | Desktop | Mobile | Route | Role | Source |
|---|---|---|---|---|---|---|
| 45 | Foundations | D45 | M45 | `(design system)` | Clan Master | prototype (D) · new (M) |

## Design tokens

Desktop and mobile share **colour, space and radius**. **Layout and type** switch by mode. The same values appear in four places, all generated from one source: Figma variables and styles (via the plugin), `tokens.json`, `tokens.css` and the HTML frames.

### Colour

The prototype defined colours in OKLCH. The hex values are their exact sRGB equivalents, and the imported frames use these same values.

| Figma variable | CSS | Hex | Use |
|---|---|---|---|
| `brand/default` | `--brand` | `#9fd959` | Primary buttons, active tab and nav, links, selected chips, focus |
| `brand/pressed` | `--brand-2` | `#b4ec76` | Pressed / hover state of primary buttons |
| `brand/link-hover` | `--brand-3` | `#c1f092` | Link hover (desktop) |
| `status/success` | `--ok` | `#61da92` | Active, accepted, verified, positive deltas |
| `status/warning` | `--warn` | `#f4c352` | Pending, unverified, expiring, unsaved changes |
| `status/danger` | `--bad` | `#fa6863` | Suspended, declined, revoked, errors, destructive actions |
| `status/info` | `--info` | `#6bb9f8` | Applications, scheduled, informational callouts |
| `surface/canvas` | `--bg` | `#0d0f14` | Page / screen background, input fields |
| `surface/default` | `--s1` | `#17191f` | Cards, sidebar, top bar, app bar, tab bar, sheets |
| `surface/raised` | `--s2` | `#21242b` | Selected nav item, chips, badges, toggle track off |
| `border/default` | `--bd` | `#2f333a` | All borders and dividers (elevation = borders, not shadows) |
| `text/primary` | `--tx` | `#f4f5f8` | Primary text and icons |
| `text/secondary` | `--tx-2` | `#ced1d6` | Inactive nav items, body copy on cards |
| `text/muted` | `--mut` | `#a1a5ab` | Labels, meta, placeholders, inactive tabs |
| `text/on-brand` | `--on-brand` | `#101216` | Text and icons on brand fills |
| `text/on-danger` | `--on-bad` | `#160a08` | Text on the red count badge |
| `overlay/scrim` | `--scrim` | `rgba(4, 6, 9, 0.72)` | Behind dialogs, sheets and the drawer |
| `overlay/focus-ring` | `--focus` | `rgba(159, 217, 89, 0.35)` | Focus ring around focused inputs |
| `placeholder/avatar-a` | `--ph-av-a` | `#383d48` | Avatar placeholder stripe |
| `placeholder/avatar-b` | `--ph-av-b` | `#292e38` | Avatar placeholder stripe |
| `placeholder/logo-a` | `--ph-logo-a` | `#3c4c3f` | Clan logo placeholder stripe |
| `placeholder/logo-b` | `--ph-logo-b` | `#2a3a2d` | Clan logo placeholder stripe |
| `placeholder/banner-a` | `--ph-banner-a` | `#1e2d21` | Clan banner placeholder stripe |
| `placeholder/banner-b` | `--ph-banner-b` | `#162018` | Clan banner placeholder stripe |
| `placeholder/banner-text` | `--ph-banner-tx` | `#c8d5ca` | Text on banner placeholders |

Elevation comes from borders, not shadows. Status is always shown with a glyph plus a colour (● ◐ ▲ ○ ✓ ✕ ⏳ ⊘), never colour alone.

### Text styles

Three families: **Space Grotesk** (headings, numbers), **IBM Plex Sans** (UI and body text) and **IBM Plex Mono** (labels, data, IDs). Letter spacing is in % of the font size, which is how Figma expresses it.

| Style | Family | Weight | Desktop | Mobile | Tracking | Use |
|---|---|---|---|---|---|---|
| Display | Space Grotesk | 600 | 30 / 115% | 26 / 120% | -1.2% | Largest headline (Foundations specimen, empty and marketing states) |
| Heading 1 | Space Grotesk | 600 | 24 / 120% | 24 / 120% | -1.2% | Clan name on profile and invitation, onboarding heading |
| Heading 2 | Space Grotesk | 600 | 20 / 125% | 18 / 125% | -1.2% | Page title (top bar / app bar), dialog and sheet titles |
| Heading 3 | Space Grotesk | 600 | 17 / 130% | 16 / 130% | 0 | Clan and team names in cards |
| Stat | Space Grotesk | 600 | 26 / 120% | 24 / 120% | 0 | KPI tile values |
| Wordmark | Space Grotesk | 600 | 14 / 110% | 14 / 110% | -1% | CLANOS wordmark |
| Body | IBM Plex Sans | 400 | 14 / 155% | 14 / 155% | 0 | Descriptions, rules, messages, list text |
| Body strong | IBM Plex Sans | 600 | 14 / 135% | 15 / 135% | 0 | Row titles, names, emphasised values |
| UI | IBM Plex Sans | 600 | 13 / 100% | 14 / 100% | 0 | Buttons, tabs, pills, active nav items |
| Caption | IBM Plex Sans | 400 | 12 / 150% | 13 / 150% | 0 | Helper text, secondary copy, notes |
| Input | IBM Plex Sans | 400 | 14 / 135% | 16 / 135% | 0 | Text in fields (16 on mobile stops iOS zoom on focus) |
| Count | IBM Plex Sans | 700 | 10 / 160% | 10 / 160% | 0 | Red notification count |
| Label | IBM Plex Mono | 600 | 10 / 120% | 10 / 120% | 8% · caps | Section labels, table headers, tile labels |
| Field label | IBM Plex Mono | 600 | 11 / 120% | 11 / 120% | 6% · caps | Form field labels |
| Badge | IBM Plex Mono | 600 | 10 / 100% | 10 / 100% | 6% · caps | Status badges |
| Data | IBM Plex Mono | 500 | 11 / 145% | 11 / 145% | 0 | IDs, timestamps, meta lines, routes |
| Data strong | IBM Plex Mono | 600 | 11 / 145% | 11 / 145% | 0 | Clan tags [RVNT], numbered rules |
| Code | IBM Plex Mono | 600 | 13 / 130% | 13 / 130% | 0 | Permission keys, audit actions |
| Micro | IBM Plex Mono | 600 | 9 / 100% | 10 / 100% | 4% · caps | Tab bar labels, SOON tags, nav counts |

The captured prototype frames include a few one-off sizes (19, 22, 23px). Snap them to the nearest style when you componentise.

### Space, radius, layout

- **Space:** 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 28 · 32. 6 and 10 are half-steps for tight gaps.
- **Radius:** `xs` 5 (badges) · `sm` 6 (small buttons, chips, segmented items) · `md` 8 (buttons, inputs, icon buttons) · `lg` 10 (cards, tiles, list cards) · `xl` 14 (dialogs, bottom sheets) · `full` full (pills, avatars, toggles)

| Layout variable | Desktop | Mobile | Use |
|---|---|---|---|
| `frame/width` | 1440 | 390 | Design frame width |
| `frame/min-height` | 900 | 844 | Design frame minimum height |
| `layout/gutter` | 28 | 16 | Page side padding |
| `layout/section-gap` | 20 | 16 | Gap between page sections and cards |
| `layout/list-gap` | 12 | 10 | Gap between list cards and tiles |
| `layout/card-padding` | 16 | 16 | Inner padding of cards |
| `control/height` | 44 | 48 | Inputs and large primary buttons |
| `control/height-sm` | 32 | 36 | Small buttons inside rows (touch area stays 44) |
| `control/touch-target` | 44 | 44 | Minimum tappable / clickable area |
| `nav/top-bar` | 72 | 56 | Desktop top bar / mobile app bar height |
| `nav/side-panel` | 236 | 316 | Desktop sidebar / mobile drawer width |
| `nav/bottom-bar` | — | 84 | Mobile tab bar incl. home indicator (none on desktop) |

## Mobile patterns

- **Navigation:** a 5-item tab bar (Home, Clans, My clan, Alerts, Me) plus a **drawer** (M43) for everything else. Underline **section tabs** switch between clan areas and scroll sideways.
- **Tables become cards** below 768px. Dialogs become **bottom sheets**: forms open at full height (top 54px) and action lists open at auto height.
- **Action bars** sit above the tab bar on tab screens and replace it on pushed and full-screen tasks (applicant review, composer, create clan).
- **Touch:** every target is at least 44 × 44, including destructive actions. Small 36px buttons keep a 44px touch area.
- **Inputs use 16px text** on mobile so iOS doesn't zoom in when a field is focused.
- **Contrast:** checked on M45. Body and label colours pass WCAG AA on every surface they're used on.

## Components to build

Build these in roughly this order, most reused first. Names match the component → route map on D45 so design and code use the same names.

1. **Status badge**: 10 status variants plus announcement and recruitment-mode variants.
2. **Button**: Primary, Pressed, Secondary, Destructive, Destructive-fill, Ghost, Dashed and Disabled, in Large (48), Default (44) and Small (36) sizes.
3. **Field**: Default, Focused, Valid, Error and Disabled; also select, textarea, the 6-digit code input and the password meter.
4. **Selection**: checkbox, radio, toggle, pill, segmented control and underline tab.
5. **Stat tile**, **Card shell** (header + rows), **Key–value row**, **Callout** (info, warning, error, success).
6. **Desktop shell**: sidebar (role switcher, nav group, nav item: default, active, soon, with count) and top bar.
7. **Mobile shell**: status bar, app bar (root, pushed, task), section tabs, tab bar, action bar, drawer, bottom sheet.
8. **Domain**: Clan card, Clan header, Member card/row, Invitation card/row, Applicant row, Team card + roster row, Rule row, Announcement row, Activity row.
9. **Auth**: brand panel (desktop), step progress, hero icon, state screen (success, declined, blocked, error).
10. **Data states**: loading skeleton, empty, error, unauthorized (D45).

## Decisions made while filling the gaps (please review)

- **Auth is email + password only.** No social sign-in was drawn; add Discord or Google if you want them.
- **Assumed rules:** passwords need 8+ characters, a number and a symbol. Email codes are 6 digits and last 10 minutes; reset links last 30 minutes; invites last 7 days (from the prototype).
- **Privacy:** Forgot password (05–06) and Wrong account (17) never reveal whether an email is registered. This follows the prototype's own rule.
- **Alerts** is a mobile tab (M24). Desktop keeps the prototype's notification button; a desktop notifications panel isn't drawn.
- **"Needs your attention":** on M26, invitation rows offer Resend / Cancel instead of the prototype's Approve / Reject.
- **Member views:** the Member dashboard (D28/M28) still shows staff KPIs, as in the prototype. Confirm this is intended. M30 hides the ⋯ row menu for Members; D30 (prototype) still shows it.
- **Example data:** "Ember Vanguard" (create clan) and the Team Alpha roster names are placeholders.

## Still not designed

- Activity feed page, plus Admin → Clans, Games and Audit logs (still marked "soon" in navigation).
- The transfer-ownership flow beyond its button, Edit profile form, Create team dialog, and the filtered tables behind Members → Pending / Suspended / Removed.
- Tablet layouts (768–1023px), a light theme, and loading/empty states drawn per screen (the patterns are on D45 and M45).

## Changing tokens or screens

`tools/tokens.py` is the single source of truth. Edit a value there, then run `tools/rebuild.sh .` from this folder; it needs Google Chrome and Python 3. The script regenerates every frame, preview, board, `tokens.json`, `tokens.css`, the Figma plugin and this guide. Then re-run the plugin's **Create / update tokens** command in Figma to pick up the changes.

| Script | Builds |
|---|---|
| `tokens.py` | Colour, space, radius, layout and type tokens, plus their JSON, CSS and plugin exports |
| `agents.py` | `nextjs-starter/` (agent rules with token tables, token checker) |
| `build.py` | Desktop frames captured from the prototype |
| `mobile.py`, `mobile.css` | Shared components and the original mobile screens |
| `screens_new.py` | Content blocks for the new screens, shared by desktop and mobile |
| `build_mobile.py`, `desktop_extra.py` | The mobile set and the new desktop screens |
| `shoot.py`, `package.py`, `handoff.py` | Previews, boards and index, and this guide |
