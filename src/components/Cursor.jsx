import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, label, [data-cursor]';

/**
 * Refined custom cursor: a precise dot that tracks the pointer 1:1 and a
 * trailing ring that springs behind it and expands over interactive targets.
 * Disabled on touch devices and under reduced motion (native cursor restored).
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('cursor-custom');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(Boolean(e.target.closest?.(INTERACTIVE)));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => { x.set(-100); y.set(-100); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      document.documentElement.classList.remove('cursor-custom');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: hovering ? 52 : 30,
            height: hovering ? 52 : 30,
            opacity: hovering ? 0.9 : 0.5,
            scale: down ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: 'var(--cursor-color)' }}
        />
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'var(--cursor-size)',
            height: 'var(--cursor-size)',
            background: 'var(--cursor-color)',
          }}
        />
      </motion.div>
    </div>
  );
}
