import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { fadeUp } from '@/lib/motion';

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ROLES = ['Backend Engineer', 'Systems Thinker', 'Builder'];

const gridStyle = {
  backgroundImage:
    'radial-gradient(circle, var(--border) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
  maskImage: 'linear-gradient(to bottom, black 20%, transparent 92%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 92%)',
};

export function Hero() {
  const city = profile.location.split(',')[0];

  return (
    <section id="hero" className="relative">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-50" style={gridStyle} />

      <div className="flex flex-col justify-center min-h-screen px-6 lg:px-10 py-24 max-w-6xl mx-auto">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">

          <motion.p
            variants={fadeUp}
            className="font-mono text-text-mono text-xs tracking-widest uppercase mb-10"
          >
            <span>{city}</span>
            <span className="text-text-secondary mx-3">/</span>
            <span>{profile.title}</span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-sans text-6xl sm:text-7xl lg:text-[8rem] xl:text-[9.5rem] font-medium text-text-primary leading-[0.92] tracking-tight mb-12 max-w-[14ch]"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-text-mono text-sm tracking-wide mb-14"
          >
            {ROLES.join('  ·  ')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mb-16"
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
