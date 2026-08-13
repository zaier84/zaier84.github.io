// Single nav model, shared by the masthead and the tick rail.
//
// Evidence first: there is no "about" destination. The bio is a margin note
// beside the first build, so the nav points only at things worth jumping to.
export const navLinks = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Measures", href: "#measures", id: "measures" },
  { label: "Record", href: "#record", id: "record" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// `thesis` is tracked by the rail for position but isn't a nav destination.
export const sectionIds = ["thesis", ...navLinks.map((l) => l.id)];
