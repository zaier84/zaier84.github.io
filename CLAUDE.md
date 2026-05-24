# Portfolio — Claude Code Guide

## Project Overview

Personal portfolio site for Muhammad Zaier Ahmad, a Software Engineer. Built with React 18 + Vite.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing:** React Router v6

## Project Structure

```
src/
  assets/          # Static assets (images, fonts, icons)
  components/      # Reusable UI components
  data/            # Structured resume/content data
    profile.js
    projects.js
    skills.js
    education.js
  pages/           # Route-level page components
```

## Coding Conventions

- **Components:** Functional components only, PascalCase names, named exports
- **Variables:** camelCase
- **HTML:** Semantic elements (`<section>`, `<article>`, `<nav>`, `<main>`, etc.)
- **Styles:** Tailwind utility classes; no inline styles unless dynamic
- **Animations:** Framer Motion `motion.*` components with `viewport` trigger for scroll animations
- **No default exports** — always use named exports

## Design Direction

- **Theme:** Dark primary, high-contrast minimal
- **Aesthetic:** Refined, editorial — think typographic clarity over flashy visuals
- **Typography:** Monospace accent font for code/technical elements (skills, labels, tags)
- **Spacing:** Generous whitespace; let content breathe
- **Animations:** Subtle scroll-triggered fade/slide via Framer Motion — no looping, no gratuitous motion
- **No** flashy gradients, neon glows, or heavy particle effects

## Dev Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```
