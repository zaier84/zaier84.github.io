export const profile = {
  name: "Muhammad Zaier Ahmad",
  title: "Backend Engineer",
  // Short hook for the hero — punchy, first-person, distinct from the resume-style bio below.
  tagline: "Backend engineer at home in the deep end. I write orchestrators, design multi-tenant schemas, integrate AI, and build complete language interpreters in Go from scratch — because understanding how things work at the bottom is how I stay sharp at the top.",
  // Full bio for the About section — recruiter-optimised: value-first opener, ATS keywords, remote signal.
  bio: "Backend and systems engineer building production-grade software since 2022. Strong foundation in systems programming (C/C++, Go) paired with full-stack delivery across Node.js, FastAPI, React, and Flutter. Currently founding and architecting a multi-tenant SaaS ERP — from schema design to backend orchestration — while maintaining CI/CD pipelines on Linux-based environments. Experienced in AI/ML integration, RESTful API design, and cross-platform mobile. Based in Lahore (PKT, UTC+5) — open to remote work globally.",
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
