// The work, ordered by weight. Source of truth for the Builds section.
//
// Every entry carries an `invariant`: the one thing that build guarantees.
// It is the organising device of the page, so it must be literally true of
// the system — never a slogan.
//
// Shape:
//   artwork  — optional { src, alt }; a real artifact, never a mockup.
//   links    — any of { github, npm, live }.
//   repos    — use instead of links.github when one entry ships several repos.
//   private  — closed source; renders the withheld-source note.

export const projects = [
  {
    id: "fin-erp",
    title: "fin-erp",
    kind: "Multi-tenant SaaS ERP",
    period: "Jan 2026 —",
    featured: true,
    invariant: "Every posting balances — or it rolls back.",
    description:
      "A multi-tenant, multi-reseller, multi-currency ERP built end to end alone. The Express 5 backend runs on a strict orchestrator → pipeline → step → engine layer over a UnitOfWork/BaseRepository transaction boundary, so a posting either commits in full — header, lines, GL journal, open item, source update, audit row — or leaves nothing behind.",
    facts: [
      ["124,000", "lines of production JavaScript"],
      ["265", "REST endpoints"],
      ["420+", "tables across 9 domain schemas"],
      ["117", "React 19 screens, no UI kit"],
    ],
    highlights: [
      "Row-level tenant isolation over a SQL Server hierarchyid organisation tree with denormalised ancestor columns — O(1) tenant → reseller → company → branch resolution behind a 17-middleware context chain and a deny-wins permission tree",
      "Finance: journal approval state machine, three posting pipelines, an Open Item settlement engine, 12 AP/AR document types, and reports sourced strictly from immutable GL entries",
      "Inventory: four costing policies over a valuation-layer model, landed cost, batch/serial/FEFO expiry, QC holds, and a reconciliation-gated period close",
      "Procure-to-Pay end to end: requisition → indent → RFQ → weighted quotation comparison → PO → goods receipt → inspection → return, bridging atomically into AP billing",
      "Hardened across two security and correctness audits; 40 Vitest integration suites (399 cases) run against a live SQL Server with a trial-balance invariant asserted on every posting phase",
    ],
    stack: ["Node.js", "Express 5", "SQL Server", "React 19", "Vitest"],
    private: true,
    links: {},
  },
  {
    id: "penstock",
    title: "penstock",
    kind: "Published npm library",
    period: "2026",
    featured: true,
    invariant: "It runs forward. On failure it walks back.",
    description:
      "A zero-dependency TypeScript library for composable backend workflows — use-cases, pipelines, steps and engines — with first-class saga rollback. When a step fails, penstock reverses through the steps that already ran and undoes them, then returns the failure as data: which steps ran, were skipped, failed or rolled back, with timings and the causal error. Extracted from the orchestration layer running fin-erp.",
    facts: [
      ["0", "runtime dependencies"],
      ["115", "tests at 95%+ coverage"],
      ["20/22/24", "Node versions in CI"],
    ],
    highlights: [
      "Reverse-order compensating rollback — failure is returned as a structured result rather than thrown",
      "Full generic type inference backed by type-level tests; dual ESM and CJS builds",
      "Supply-chain hardened: OIDC trusted publishing with provenance, prototype-pollution resistant, zero telemetry",
    ],
    stack: ["TypeScript", "Node.js", "Vitest", "tsup"],
    version: "v0.3.0",
    links: {
      npm: "https://www.npmjs.com/package/penstock",
      github: "https://github.com/zaier84/penstock",
    },
  },
  {
    id: "capo",
    title: "capo",
    kind: "Keyboard-layout compiler",
    period: "2026",
    invariant: "One source, four targets. Byte-identical, every run.",
    description:
      "A compiler written in Go: one declarative .layout file lowers to an XKB symbols file, a Linux vconsole keymap, a kanata behaviour skeleton and an SVG cheatsheet. Hand-written lexer and parser over a Unicode-aware token model, with a validator that collects every diagnostic in a single pass instead of stopping at the first.",
    facts: [
      ["1 → 4", "source to output targets"],
      ["0", "generated parser code"],
    ],
    highlights: [
      "Deterministic output — the same source produces the same bytes on every run",
      "Diagnostics as file:line:col with rune-accurate columns, keys named by QWERTY position, and did-you-mean suggestions",
      "Backed by a normative specification that makes the diagnostic format part of the public contract",
    ],
    stack: ["Go", "Compiler design", "Unicode", "XKB"],
    // The compiler's own output, used as the plate. Not a mockup.
    artwork: {
      src: "/capo-dvorak.svg",
      alt: "The Dvorak cheatsheet capo renders from a .layout source file",
    },
    links: { github: "https://github.com/zaier84/capo" },
  },
  {
    id: "nvim-plugins",
    title: "focus.nvim & scratch.nvim",
    kind: "Neovim plugins",
    period: "2026",
    invariant: "The timer never blocks the editor.",
    description:
      "Two editor plugins in Lua. focus.nvim runs a Pomodoro on a native libuv timer handle — no polling loop, and it never blocks input, redraws or the main thread — surfacing state through a winbar HUD that restores whatever winbar was already there. scratch.nvim keeps per-filetype singleton scratch buffers with stale-handle eviction and optional stdpath persistence.",
    facts: [
      ["0", "polling loops"],
    ],
    highlights: [
      "Driven by a native libuv (vim.uv) timer handle, so there is no input latency",
      "The winbar HUD saves and restores any pre-existing winbar rather than clobbering it",
      "Both tested headlessly with plenary busted",
    ],
    stack: ["Lua", "Neovim", "libuv"],
    repos: [
      { label: "focus.nvim", href: "https://github.com/zaier84/focus.nvim" },
      { label: "scratch.nvim", href: "https://github.com/zaier84/scratch.nvim" },
    ],
  },
  {
    id: "macromate",
    title: "MacroMate",
    kind: "Final year project",
    period: "2025 – 2026",
    invariant: "One codebase, both platforms.",
    description:
      "A cross-platform Flutter app for calorie, macronutrient and workout tracking on FastAPI REST services, using the Gemini API for food-image recognition and a pretrained model for meal-plan generation.",
    facts: [],
    highlights: [],
    stack: ["Flutter", "FastAPI", "Python", "Gemini API"],
    links: { github: "https://github.com/zaier84/MacroMate" },
  },
];
