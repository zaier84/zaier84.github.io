import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { skills } from '@/data/skills';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';

export function About() {
  return (
    <SectionShell id="about" number="01" label="About">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          variants={fadeUp}
          className="text-text-primary text-lg lg:text-xl leading-relaxed mb-16 max-w-2xl"
        >
          {profile.bio}
        </motion.p>

        <motion.div variants={fadeUp} className="mb-6">
          <p className="font-mono text-text-mono text-xs tracking-widest uppercase">
            Stack
          </p>
        </motion.div>

        <motion.dl variants={staggerContainer} className="space-y-5">
          {skills.map(group => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-8 gap-y-2 items-baseline"
            >
              <dt className="font-mono text-text-mono text-xs tracking-widest uppercase">
                {group.category}
              </dt>
              <dd className="font-mono text-text-secondary text-sm leading-relaxed">
                {group.items.map((item, i) => (
                  <span key={item}>
                    {i > 0 && <span className="text-border mx-2.5">·</span>}
                    <span className="hover:text-text-primary transition-colors duration-150">
                      {item}
                    </span>
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </SectionShell>
  );
}
