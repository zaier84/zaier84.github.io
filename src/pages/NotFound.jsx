import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { useScramble } from '@/lib/useScramble';

export function NotFound() {
  const [code] = useScramble('SIGSEGV', { speed: 0.6 });

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-text-tertiary text-xs tracking-[0.3em] uppercase mb-6"
        >
          Error 404 · <span className="text-accent">{code}</span>
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display text-text-primary text-6xl sm:text-7xl font-semibold tracking-tight leading-none mb-6"
        >
          Null pointer.
        </motion.h1>
        <motion.p variants={fadeUp} className="font-mono text-text-secondary text-sm mb-2">
          <span className="text-text-tertiary">{'>'}</span> the page you requested dereferences to nothing.
        </motion.p>
        <motion.p variants={fadeUp} className="text-text-tertiary text-sm mb-10">
          It moved, or it never existed.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong text-text-primary px-5 py-2.5 font-mono text-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <span aria-hidden>←</span> return home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
