import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin top-of-page reading-progress bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2px] bg-accent origin-left z-[55]"
    />
  );
}
