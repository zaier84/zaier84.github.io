export const profile = {
  name: "Muhammad Zaier Ahmad",
  title: "Software Engineer",
  bio: "Software Engineer with a strong systems programming foundation (C/C++, Go) and hands-on full-stack experience across React, Node.js, FastAPI, and Flutter. Currently building a production-grade multi-tenant ERP system with a 400+ table MS SQL Server schema and an orchestrator-driven Node.js backend. Experienced in AI/ML integration, REST API design, and cross-platform mobile development.",
  location: "Lahore, Pakistan",
  contact: {
    email: "zaier8284@gmail.com",
    github: "https://github.com/zaier84/",
    linkedin: "https://linkedin.com/in/zaier-ahmad-367951309/",
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
    label: "LinkedIn",
    display: "linkedin.com/in/zaier-ahmad",
    href: profile.contact.linkedin,
  },
];
