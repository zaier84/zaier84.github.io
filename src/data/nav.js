// Single nav model, shared by Navbar, MobileMenu and the command palette.
export const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// `hero` is tracked for the active-section indicator but isn't a nav item.
export const sectionIds = ["hero", ...navLinks.map((l) => l.id)];
