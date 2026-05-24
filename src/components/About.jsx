import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { skills } from '@/data/skills';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-5xl mx-auto border-t border-border">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2 variants={fadeUp} className="font-mono text-text-mono text-xs tracking-widest uppercase mb-16">
          <span className="text-text-secondary mr-3">01</span>
          <span>About</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-text-secondary text-base leading-relaxed max-w-2xl mb-16">
          {profile.bio}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {skills.map(group => (
            <motion.div key={group.category} variants={fadeUp}>
              <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.12 }}
                    className="font-mono text-text-secondary text-xs px-3 py-1.5 border border-border hover:border-text-mono hover:text-text-primary transition-colors duration-150 cursor-default select-none"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
