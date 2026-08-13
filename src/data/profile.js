export const profile = {
  name: "Muhammad Zaier Ahmad",
  title: "Backend Engineer",
  // Short hook for the hero — first-person, and every clause names something
  // that actually exists and can be clicked.
  tagline:
    "Backend engineer building systems that have to be correct — a multi-tenant SaaS ERP where every posting commits atomically or not at all, a zero-dependency orchestration library published on npm, and a keyboard-layout compiler written in Go.",
  // Full bio for the About section — mirrors the résumé summary so the two
  // documents agree, keeps ATS keywords, and carries the remote-work signal.
  bio: "Backend and systems-focused engineer working in Go, Node.js, TypeScript, and Lua. Currently building fin-erp solo — a multi-tenant, multi-reseller SaaS ERP covering General Ledger, AP/AR, Inventory, and Procure-to-Pay — while maintaining penstock, a zero-dependency workflow orchestration library published on npm, and capo, a Go compiler for a keyboard-layout DSL with four output targets. Grounded in systems programming (C/C++, Go), REST API design, multi-tenancy and RBAC, and test-driven delivery. Based in Lahore (PKT, UTC+5) — open to remote work globally.",
  location: "Lahore, Pakistan",
  // Cycled in the hero. Every entry is a title the résumé actually supports.
  roles: ["Backend Engineer", "Systems Engineer", "Founder & Lead Engineer"],
  // Live status line in the hero.
  status: "Currently — building fin-erp, solo",
  contact: {
    email: "zaier8284@gmail.com",
    github: "https://github.com/zaier84/",
    linkedin: "https://www.linkedin.com/in/zaier-ahmad/",
    npm: "https://www.npmjs.com/~zaier",
  },
};

export const socialLinks = [
  {
    label: "Email",
    display: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    label: "GitHub",
    display: "github.com/zaier84",
    href: profile.contact.github,
  },
  {
    label: "npm",
    display: "npmjs.com/~zaier",
    href: profile.contact.npm,
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/zaier-ahmad",
    href: profile.contact.linkedin,
  },
];
