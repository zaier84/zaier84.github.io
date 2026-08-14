# Portfolio — Claude Code Guide

## Project Overview

Personal portfolio site for Muhammad Zaier Ahmad, a Backend Engineer. React 18 + Vite,
deployed to GitHub Pages at `zaier84.github.io` (a user site, so Vite's base stays `/`).

## Design direction — "Invariant"

The page is built as a **precision-instrument plate**. Everything Zaier builds guarantees
something, so every project is stated as the invariant it holds:

| Build | Invariant |
|---|---|
| fin-erp | Every posting balances — or it rolls back. |
| penstock | It runs forward. On failure it walks back. |
| capo | One source, four targets. Byte-identical, every run. |
| focus.nvim | The timer never blocks the editor. |

That device drives the layout, the copy and the one signature moment. Three earlier versions
of this site swapped the accent colour (amber → indigo → emerald) without changing the form;
this one changes the form and keeps the content.

**Deliberately avoided**, because they are what LLM-generated portfolios converge on:
`01 / 02 / 03` section numbering, mono uppercase `tracking-[0.25em]` eyebrows, terminal
costume (prompt glyphs, blinking carets, text scramble), a pinging "available for work" dot,
custom cursors, magnetic buttons, ⌘K palettes, film grain, count-up numbers, WebGL noise
fields, smooth-scroll hijacking, scroll-progress bars, glassmorphism, gradient text, bento
grids, and the three stock palettes (near-black + acid accent, cream + serif + terracotta,
broadsheet hairline columns). Do not reintroduce these.

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS v3 (design tokens as CSS custom properties in `src/index.css`)
- **Routing:** React Router v7 (two routes; backs the `dist/404.html` SPA shim)
- **Animation:** none. There is no animation library — the single signature motion is CSS.

## Project Structure

```
src/
  components/
    BalanceBar.jsx    # SIGNATURE: beam settles into equilibrium once on load
    Build.jsx         # one build, led by its invariant
    Builds.jsx        # the work section + the bio margin note
    Contact.jsx       # direct addresses only, no form
    Footer.jsx        # copyright + colophon
    Layout.jsx        # skip link, masthead, <main tabIndex={-1}>, footer
    Masthead.jsx      # flat ruled header; second nav row on mobile, no drawer
    Readouts.jsx      # instrument panel of fin-erp figures (static, not counters)
    Record.jsx        # roles, credentials, and the equipment list
    Section.jsx       # THE structural unit — gutter ruler + major tick + label
    Thesis.jsx        # opens on the thesis sentence, not on a name
  context/
    ThemeContext.jsx  # theme + localStorage; pairs with the pre-paint script in index.html
  data/               # All content — edit here, never hardcode in components
    education.js      # degree + certifications (each carries `start` for <time datetime>)
    experience.js     # professional roles
    nav.js            # navLinks + sectionIds
    profile.js        # name, thesis, lede, note (bio), contact, socialLinks
    projects.js       # the builds — each with an `invariant`
    skills.js         # the equipment list, rendered inside Record
    stats.js          # the readouts
  lib/
    useActiveSection.js  # IntersectionObserver active-section for the masthead
  pages/
    Home.jsx          # thesis → work → measures → record → contact
    NotFound.jsx      # off-scale 404, same instrument register
  index.css           # tokens, base, the `settle` keyframe, the `.ruler` gutter
```

## Design System

### Colour tokens (`src/index.css`)

Warm bone type on a cool petrol ground, with one oxide signal used as **flat marks, never
glow**. Consumed via Tailwind aliases: `bg-ground`, `bg-raised`, `text-bone`, `text-bone-dim`,
`border-rule`, `border-rule-strong`, `text-oxide`, `bg-oxide`, `text-oxide-on`.

**Dark (`:root`):** `--ground #101b1f` · `--bone #e8e2d6` · `--oxide #d4762a`
**Light (`[data-theme="light"]`):** a true inversion — bone paper, petrol ink, darkened oxide.

**Contrast rules — do not regress these.** Measured ratios are documented inline in
`src/index.css`:
- Every text token clears WCAG AA (4.5:1) against `--ground` in both themes.
- `--rule` is decorative hairline only. Anything outlining an *interactive* control uses
  `--rule-strong`, which clears the 3:1 non-text threshold.
- Filled signal fields use `bg-oxide text-oxide-on` — never white on oxide.

### Typography

- **Display:** Archivo (`font-display`), set **expanded** via `font-stretch: 118%`. The width
  axis is where the page gets its voice. Reserved for the thesis, build names and readouts.
- **Body:** Instrument Sans (`font-sans`).
- **Data:** Spline Sans Mono (`font-data`) — readouts, labels, tick values, always tabular.
- Scale: `text-thesis` / `text-build` / `text-readout`, clamp-based, in `tailwind.config.js`.
- One `<link>` in `index.html`. Never move fonts to a CSS `@import` — it is render-blocking.

### Structure — the gutter ruler replaces section numbers

`Section.jsx` renders a left gutter carrying a continuous ruler (a hairline plus minor ticks,
drawn with `.ruler` in CSS) and a major tick with the section name. Every section draws one, so
the measure runs unbroken and stays locked to the content grid. **This is why there are no
section numbers**: position on the rule already says where you are. It also replaces the
scroll-progress bar.

`labelAs` controls whether the gutter name is the section's `<h2>`. Where the content supplies
its own heading (Thesis has the `<h1>`, Contact has its own `<h2>`), pass `labelAs="p"` so the
outline stays valid; the section is then named by `aria-label` instead.

### Motion

**There is exactly one animation.** `BalanceBar` tilts and settles into equilibrium once on
load (`settle` keyframe, ~1.9s), then is still forever. It never loops and never replays.
Everything else is a focus or hover state. Under `prefers-reduced-motion` the beam renders
already level. Do not add scroll-triggered reveals.

## Coding Conventions

- **Components:** functional, PascalCase, **named exports** (no default exports).
- **HTML:** semantic elements (`<section>`, `<article>`, `<dl>`, `<time>`, `<figure>`).
- **Styles:** Tailwind utilities; `style={{}}` only where a CSS variable requires it.
- **No raw hex** in components — always a token class.
- **Never use the `/opacity` colour modifier on a token colour** (e.g. `text-bone/[0.05]`). The
  tokens are bare `var()` values with no `<alpha-value>` slot, so Tailwind emits **no rule at
  all** and the element silently renders at full opacity. Use the `opacity-*` utility instead.
- **No overlays.** There is no drawer, modal or command palette, so the codebase needs no focus
  trap or scroll lock. Mobile navigation is a second masthead row, not a drawer. Keep it that
  way unless there is a strong reason otherwise.
- **All work is on the page.** No cover-button cards, no expand-to-read. The work is the
  evidence, so hiding it behind an interaction works against the brief.
- **Accessibility floor:** visible focus on every control; the skip link moves focus into
  `<main tabIndex={-1}>`; one `<h1>`, properly nested `<h2>`/`<h3>` beneath it; `<time>` always
  carries `dateTime` (the data files provide `start` for this).

## Content Updates

All visible copy lives in `src/data/`:
- Thesis, lede, bio note, contact → `profile.js`
- The builds and their invariants → `projects.js`
- Roles → `experience.js` · Degree and certs → `education.js`
- Readout figures → `stats.js` · Equipment list → `skills.js`

Every figure must be true and checkable against the résumé in `public/`. No derived or
unfalsifiable numbers.

## Deployment

`.github/workflows/deploy.yml` runs `npm ci` → `npm run lint` → `npm run build` on pushes to
`main`, then publishes `dist` to GitHub Pages. `vite.config.js` copies `index.html` to
`dist/404.html` so deep links boot the SPA instead of GitHub's 404.

**Bump the `?v=` on `/favicon.svg` and `og.png` in `index.html` whenever you repaint them.**
Both are referenced by a stable path, and both are cached per-URL far more aggressively than
normal assets — browsers keep favicons in a store that survives a hard refresh, and LinkedIn
and Slack cache `og:image` by URL. Changing the file's bytes alone will not reach anyone who
has already loaded the old one; changing the query string will. GitHub Pages sends a fixed
`Cache-Control: max-age=600` and exposes no header configuration, so the URL is the only lever.

## Dev Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check (jsx-a11y + react-hooks)
```
