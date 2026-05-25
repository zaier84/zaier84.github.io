# Portfolio — Claude Code Guide

## Project Overview

Personal portfolio site for Muhammad Zaier Ahmad, a Backend Engineer. Built with React 18 + Vite.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3 (design tokens via CSS custom properties in `src/index.css`)
- **Animation:** Framer Motion v12
- **Routing:** React Router v7
- **Smooth scroll:** Lenis
- **WebGL:** ogl (dynamically imported — code-split chunk)
- **Command palette:** cmdk

## Project Structure

```
src/
  components/         # Reusable UI components
    About.jsx         # Bio + skills spotlight stack
    CommandPalette.jsx # ⌘K palette (cmdk) — navigate, actions, external links
    Contact.jsx       # Social links + contact form (Formspree)
    Credentials.jsx   # Education + certifications grid
    Cursor.jsx        # Custom cursor (dot + spring ring) — fine pointer + motion only
    Experience.jsx    # Professional timeline + Credentials
    Footer.jsx        # Colophon with live local time
    Hero.jsx          # Full-bleed hero: shader, scramble roles, live time, CTA
    Layout.jsx        # Root layout: Lenis, CommandPalette, Cursor
    MagneticButton.jsx # Magnetic hover wrapper (pointer tracking)
    MobileMenu.jsx    # Full-screen mobile nav overlay
    Navbar.jsx        # Sticky nav with active-section indicator + ⌘K button
    ProjectCard.jsx   # Card with cover-button pattern (article + absolute button)
    ProjectDrawer.jsx # Slide-in detail drawer for project expand
    Projects.jsx      # Filterable project grid + ProjectDrawer
    ScrollProgress.jsx # Thin top progress bar
    SectionShell.jsx  # 12-col grid shell shared by all content sections
    ShaderField.jsx   # WebGL flow-field background (ogl, domain-warp FBM)
    Stats.jsx         # Count-up metrics band
  context/
    ThemeContext.jsx   # Dark/light theme context + localStorage persistence
  data/               # All content — edit here, never hardcode in components
    education.js      # Degree + certifications
    experience.js     # Professional roles / work history
    profile.js        # Name, title, tagline, bio, contact, socialLinks
    projects.js       # Portfolio projects with tech, links, highlights
    skills.js         # Skills by category
  lib/                # Hooks and animation utilities
    motion.js         # Shared Framer Motion variants (EASE, fadeUp, blurReveal, lineChild…)
    useActiveSection.js # IntersectionObserver-based active nav section
    useLenis.js       # Mounts Lenis smooth scroll; skips on reduced-motion / coarse pointer
    useLocalTime.js   # Live clock via Intl.DateTimeFormat (updates every second)
    useScramble.js    # RAF text-scramble/decode effect
  pages/
    Home.jsx          # Route "/" — section composition order
    NotFound.jsx      # 404 SIGSEGV theme
  index.css           # Design tokens (:root + [data-theme="light"]), base styles, Lenis, cursor
```

## Design System

### Color Tokens (`src/index.css`)

All colors are CSS custom properties consumed via Tailwind's token aliases
(`bg-bg-primary`, `text-text-secondary`, `border-border-strong`, `bg-accent`, etc.).
Never use raw hex values in components — always reference the token.

**Dark mode (`:root`):** Warm charcoal family (`#111110` base) + emerald accent (`#34d399`).
**Light mode (`[data-theme="light"]`):** Warm linen (`#f5f0e8` base) + emerald-600 (`#059669`).

To change the palette, update only `:root` / `[data-theme="light"]` in `src/index.css`.

### Typography

- **Display:** Space Grotesk (`font-display`) — kinetic headlines only
- **Body:** Inter (`font-sans`) — all prose
- **Mono:** JetBrains Mono (`font-mono`) — labels, tags, badges, code
- **Display scale:** `text-display-sm` / `text-display` / `text-display-lg` (clamp-based, defined in `tailwind.config.js`)
- Body `line-height: 1.6` set globally; tight headlines use `leading-[0.92]`

### Design Direction

- Warm, editorial — typographic clarity is the primary visual interest
- Restrained motion: scroll-triggered reveal (Framer Motion viewport), text scramble, count-up
- WebGL shader (ShaderField) is the only "heavy" visual — sits behind content, subtly animated
- Custom cursor on fine-pointer + motion-allowed devices only
- `prefers-reduced-motion`: shader → static gradient, no Lenis, no cursor, scramble resolves instantly
- No looping animations except the shader and the hero role cycle (2800ms interval)

## Coding Conventions

- **Components:** Functional only, PascalCase names, **named exports** (no default exports)
- **Variables:** camelCase
- **HTML:** Semantic elements (`<section>`, `<article>`, `<nav>`, `<main>`, `<time>`, `<address>`)
- **Styles:** Tailwind utility classes; dynamic values via `style={{}}` only when CSS vars or motion values require it
- **No raw hex** — always use design token classes
- **Card with links pattern:** `<article>` → absolute cover `<button>` (z-0) → `pointer-events-none` content wrapper (z-10) → real `<a>` links at z-10 with `pointer-events-auto`. Never nest `<a>` or `<button>` inside another interactive element.
- **ShaderField theme reactivity:** Pass `key={theme}` from the parent so ShaderField remounts and re-reads CSS vars on theme change. Do not pass theme as a prop.
- **ogl / heavy deps:** Always dynamically import (`import('ogl')` inside `useEffect`) to keep the main bundle lean.

## Content Updates

All visible copy lives in `src/data/`. To update the portfolio:
- Personal info, bio, tagline → `profile.js`
- Work history → `experience.js`
- Projects → `projects.js`
- Skills → `skills.js`
- Education / certs → `education.js`

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_FORMSPREE_ID` | Formspree form ID — contact form is hidden when unset |

## Dev Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```
