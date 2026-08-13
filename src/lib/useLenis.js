import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

const SCROLL_OFFSET = -80;

// Single app-wide instance. Anything that needs to move the page (anchor
// clicks, the command palette) goes through `scrollToId` so there is exactly
// one scroll driver rather than Lenis and scrollIntoView fighting each other.
let instance = null;

/**
 * Scrolls to an element by id, moves focus to it, and updates the URL hash.
 * Falls back to native scrolling when Lenis isn't mounted (reduced motion,
 * touch devices).
 */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el, { offset: SCROLL_OFFSET });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  history.pushState(null, '', `#${id}`);

  // Native anchor navigation moves focus; doing it manually keeps in-page
  // jumps (and the skip link) working for keyboard and screen-reader users.
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1');
  }
  el.focus({ preventScroll: true });
}

/**
 * Mounts Lenis smooth-scroll for the page. No-op under reduced motion or on
 * coarse (touch) pointers, where native scrolling is preferable. Native scroll
 * events still fire, so Framer Motion's useScroll / ScrollProgress keep working.
 */
export function useLenis() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    instance = lenis;

    // Let in-page anchor links route through Lenis for eased jumps.
    const onClick = (e) => {
      // Leave modified clicks alone so ⌘/Ctrl-click can still open a new tab.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href.length < 2) return;
      if (!document.getElementById(href.slice(1))) return;

      e.preventDefault();
      scrollToId(href.slice(1));
    };
    document.addEventListener('click', onClick);

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      instance = null;
    };
  }, [reduce]);
}
