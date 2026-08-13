export const profile = {
  name: "Muhammad Zaier Ahmad",
  title: "Backend Engineer",

  // The thesis. The most characteristic true sentence about the work, and the
  // organising idea for the whole page: everything here guarantees something.
  thesis: "Every posting balances — or it rolls back.",
  lede: "I build backend systems around invariants that have to hold: a 420-table ERP ledger, a library that undoes its own work, a compiler that emits the same bytes every run.",

  // Margin note beside the first build. Deliberately not its own section.
  note: "Backend and systems engineer in Lahore, working in Go, Node.js, TypeScript and Lua. Finishing a software engineering degree at the University of Central Punjab. Open to remote work.",

  location: "Lahore, Pakistan",
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
