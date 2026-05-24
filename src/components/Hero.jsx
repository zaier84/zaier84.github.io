import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { fadeUp } from '@/lib/motion';

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const ROLES = ['Backend Engineer', 'Systems Thinker', 'Builder'];

const gridStyle = {
  backgroundImage:
    'radial-gradient(circle, var(--border) 1px, transparent 1px)',
  backgroundSize: '28px 28px',
  maskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 95%)',
};

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-60" style={gridStyle} />

      <div className="min-h-screen flex items-center px-6 py-24 max-w-5xl mx-auto">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">

          <motion.p
            variants={fadeUp}
            className="font-mono text-text-mono text-xs tracking-widest uppercase mb-6"
          >
            {profile.title}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-sans text-6xl sm:text-7xl lg:text-[5.5rem] font-semibold text-text-primary leading-[1.05] tracking-tight mb-6"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-text-mono text-sm tracking-wide mb-10"
          >
            {ROLES.join('  ·  ')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-base leading-relaxed max-w-xl mb-12"
          >
            {profile.bio}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="font-mono text-sm px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-bg-primary transition-colors duration-150"
            >
              View Projects
            </a>
            <a
              href="/Zaier_Ahmad_Resume.pdf"
              download
              className="font-mono text-sm px-6 py-3 border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors duration-150"
            >
              Download Resume
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
