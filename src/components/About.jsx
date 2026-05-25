import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { skills } from '@/data/skills';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';

export function About() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${mx}px ${my}px, var(--accent-soft), transparent 80%)`;

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

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
          className="text-text-primary text-lg lg:text-xl leading-relaxed font-normal tracking-tight mb-12 max-w-2xl"
        >
          {profile.bio}
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
          <span aria-hidden className="h-px w-8 bg-accent" />
          <p className="font-mono text-text-tertiary text-xs tracking-[0.25em] uppercase">
            Stack
          </p>
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          onPointerMove={onMove}
          className="group/stack relative grid gap-px bg-border rounded-xl overflow-hidden border border-border"
        >
          {/* Cursor-tracked spotlight tinting the stack. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/stack:opacity-100"
            style={{ background: spotlight }}
          />

          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="relative z-10 grid grid-cols-1 gap-x-8 gap-y-3 bg-bg-surface px-5 py-5 sm:grid-cols-[minmax(7rem,9rem)_1fr]"
            >
              <dt className="font-mono text-text-primary text-xs tracking-[0.18em] uppercase pt-1">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-text-secondary text-xs px-2.5 py-1 rounded-md border border-border
                               hover:border-accent hover:text-text-primary hover:-translate-y-0.5
                               transition-all duration-200"
                  >
                    {item}
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
