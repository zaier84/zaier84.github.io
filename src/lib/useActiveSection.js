import { useState, useEffect } from 'react';

/**
 * Tracks which section id is currently crossing the vertical center of the
 * viewport. Returns the active id — used to highlight the matching nav link.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band at the vertical center: whichever section crosses it wins.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return active;
}
