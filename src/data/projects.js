// Portfolio work, ordered by weight. Source of truth for the Projects section.
//
// Shape:
//   artwork  — optional { src, alt }; when absent the card falls back to the
//              generated ghost-index motif.
//   links    — any of { github, npm, live }. Omit entirely for closed source
//              and set `private: true` so the card renders the lock badge.

export const projects = [
  {
    id: "fin-erp",
    title: "fin-erp",
    type: "Professional · Solo build",
    period: "Jan 2026 – Present",
    featured: true,
    description:
      "A multi-tenant, multi-reseller, multi-currency SaaS ERP built end to end alone: 124,000 lines of production JavaScript across 265 REST endpoints, a 420+ table SQL Server database spanning 9 domain schemas, and a 117-screen React 19 SPA written with no data-fetching library and no UI kit. The Express 5 backend runs on a strict orchestrator → pipeline → step → engine layer over a UnitOfWork/BaseRepository transaction boundary, so every posting — header, lines, GL journal, open item, source update, audit row — commits atomically or rolls back as one unit.",
    highlights: [
      "Row-level tenant isolation over a SQL Server hierarchyid org tree with denormalized ancestor columns — O(1) tenant → reseller → company → branch resolution",
      "17-middleware context chain and a deny-wins permission tree mirrored client-side",
      "Finance: journal approval state machine, three posting pipelines, Open Item settlement engine, 12 AP/AR document types, reports sourced strictly from immutable GL entries",
      "Inventory: four costing policies over a valuation-layer model, landed cost, batch/serial/FEFO expiry, QC holds, reconciliation-gated period close",
      "Full Procure-to-Pay: requisition → indent → RFQ → weighted quotation comparison → PO → goods receipt → inspection → return, bridging atomically into AP billing",
      "Hardened across two security and correctness audits; 40 Vitest integration suites (399 cases) against a live SQL Server, with a trial-balance invariant asserted on every posting phase",
    ],
    tech: ["Node.js", "Express 5", "Microsoft SQL Server", "React 19", "Vitest"],
    // Commercial product — source is closed.
    private: true,
    links: {},
  },
  {
    id: "penstock",
    title: "penstock",
    type: "Published npm library",
    period: "2026",
    featured: true,
    description:
      "A zero-dependency TypeScript library for composable backend workflows — use-cases, pipelines, steps, and engines — with first-class saga-pattern rollback. When a step fails, penstock walks backwards and undoes the work that already happened, then returns failure as data: a structured result naming which steps ran, were skipped, failed, or rolled back, with timings and the causal error. Extracted from the orchestration layer that runs fin-erp.",
    highlights: [
      "Reverse-order compensating rollback — failure returns a structured Result instead of throwing",
      "Full generic type inference backed by type-level tests; dual ESM/CJS builds",
      "115 tests at 95%+ coverage on a CI matrix across Node 20, 22, and 24",
      "Supply-chain hardened: OIDC trusted publishing with provenance, prototype-pollution resistant, zero telemetry",
    ],
    tech: ["TypeScript", "Node.js", "Vitest", "tsup"],
    badge: { label: "npm", value: "v0.3.0" },
    links: {
      npm: "https://www.npmjs.com/package/penstock",
      github: "https://github.com/zaier84/penstock",
    },
  },
  {
    id: "capo",
    title: "capo",
    type: "Compiler",
    period: "2026",
    description:
      "A compiler for keyboard layouts, written in Go: one declarative .layout source file lowers to four output targets — an XKB symbols file, a Linux vconsole keymap, a kanata behavior skeleton, and an SVG cheatsheet — byte-identical on every run. Hand-rolled lexer and parser over a Unicode-aware token model, with an error-collecting validator that reports every diagnostic in a single pass.",
    highlights: [
      "One source → four targets, deterministic across runs",
      "Hand-written lexer and parser; no generator, no runtime dependencies",
      "Diagnostics as file:line:col with rune-accurate columns, keys named by QWERTY position, and did-you-mean suggestions",
      "Backed by a normative spec that makes diagnostic format part of the public contract",
    ],
    tech: ["Go", "Compiler Design", "Unicode", "XKB"],
    // The compiler's own output, used as the card artwork.
    artwork: {
      src: "/capo-dvorak.svg",
      alt: "The Dvorak cheatsheet capo renders from a .layout source file",
    },
    links: { github: "https://github.com/zaier84/capo" },
  },
  {
    id: "nvim-plugins",
    title: "focus.nvim & scratch.nvim",
    type: "Neovim plugins",
    period: "2026",
    description:
      "Two editor plugins in Lua. focus.nvim is an asynchronous Pomodoro tracker driven by a native libuv timer handle — zero polling, and it never blocks input, redraws, or the main thread — surfacing state through a winbar HUD that saves and restores any pre-existing winbar rather than clobbering it. scratch.nvim manages per-filetype singleton scratch buffers with stale-handle eviction, configurable split or float placement, and optional stdpath persistence.",
    highlights: [
      "Native libuv (vim.uv) timer handle — no polling loop, no input latency",
      "Winbar HUD saves and restores whatever winbar was already there",
      "Per-filetype singleton scratch buffers with stale-handle eviction",
      "Both tested headlessly with plenary busted",
    ],
    tech: ["Lua", "Neovim", "libuv"],
    // Two repos, so the card renders a labelled link per repo instead of a
    // single generic "Source" button.
    repos: [
      { label: "focus.nvim", href: "https://github.com/zaier84/focus.nvim" },
      { label: "scratch.nvim", href: "https://github.com/zaier84/scratch.nvim" },
    ],
  },
  {
    id: "macromate",
    title: "MacroMate",
    type: "Final year project",
    period: "2025 – 2026",
    description:
      "A cross-platform Flutter app for calorie, macronutrient, and workout tracking, backed by FastAPI REST services. Uses the Gemini API for food-image recognition and a pretrained model for meal-plan generation.",
    highlights: [
      "Gemini API food-image recognition",
      "Pretrained model for meal-plan generation",
      "FastAPI REST backend, auth and data management",
    ],
    tech: ["Flutter", "FastAPI", "Python", "Gemini API"],
    links: { github: "https://github.com/zaier84/MacroMate" },
  },
];

// Filter chips for the Projects section, in display order. `Projects.jsx`
// drops any tag that no longer matches a project, so this stays safe to edit.
export const projectFilters = ["All", "Node.js", "TypeScript", "Go", "Lua", "Python"];
