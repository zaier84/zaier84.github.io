import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

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

    // Let in-page anchor links route through Lenis for eased jumps.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.pushState(null, '', id);
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
    };
  }, [reduce]);
}
