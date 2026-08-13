// Real professional roles — distinct from `projects` (portfolio work) and
// `education`/`certifications` (credentials).
export const experience = [
  {
    role: "Founder & Lead Engineer",
    company: "fin-erp — Independent SaaS Product",
    kind: "Professional",
    period: "Jan 2026 – Present",
    // Machine-readable start for <time datetime>; the display string is a
    // range, which a single <time> cannot express on its own.
    start: "2026-01",
    location: "Lahore, Pakistan",
    summary:
      "Sole engineer on a commercially distributable multi-tenant, multi-reseller, multi-currency SaaS ERP — end-to-end ownership from schema design and backend architecture through the front end and deployment.",
    highlights: [
      "Built 124,000 lines of production JavaScript: 265 REST endpoints, a 420+ table SQL Server database across 9 domain schemas, and a 117-screen React 19 SPA with no data-fetching library and no UI kit",
      "Engineered the Express 5 backend on a strict orchestrator → pipeline → step → engine layer over a UnitOfWork/BaseRepository transaction boundary, so every posting commits atomically or rolls back as one unit",
      "Designed row-level tenant isolation over a SQL Server hierarchyid organization tree with denormalized ancestor columns — O(1) tenant → reseller → company → branch resolution behind a 17-middleware context chain and a deny-wins permission tree",
      "Implemented Finance (journal approval state machine, three posting pipelines, Open Item settlement engine, 12 AP/AR document types) and Inventory (four costing policies over a valuation-layer model, landed cost, batch/serial/FEFO expiry, QC holds, reconciliation-gated period close)",
      "Delivered the full Procure-to-Pay chain — requisition through RFQ, weighted quotation comparison, PO, goods receipt, inspection and return — bridging atomically into AP billing behind a config-driven tolerance engine",
      "Hardened the system across two security and correctness audits, closing cross-tenant posting holes, session-revocation gaps, concurrency races and timezone defects; regression-tested by 40 Vitest integration suites (399 cases) against a live SQL Server with a trial-balance invariant asserted on every posting phase",
    ],
    tech: ["Node.js", "Express 5", "Microsoft SQL Server", "React 19", "Vitest"],
  },
];
