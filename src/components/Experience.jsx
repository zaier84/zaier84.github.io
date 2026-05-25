import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';
import { Credentials } from '@/components/Credentials';

export function Experience() {
  return (
    <SectionShell id="experience" number="03" label="Experience">
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {experience.map((job) => (
          <motion.li
            key={`${job.role}-${job.company}`}
            variants={fadeUp}
            className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[minmax(7rem,9rem)_1fr]"
          >
            <time className="font-mono text-text-tertiary text-xs tracking-wide whitespace-nowrap sm:pt-1">
              {job.period}
            </time>

            <div className="relative pb-12 last:pb-0 sm:border-l sm:border-border sm:pl-8">
              <span
                aria-hidden
                className="absolute -left-[4px] top-1.5 hidden h-2 w-2 rounded-full bg-accent ring-4 ring-bg-primary sm:block"
              />
              <p className="font-mono text-text-tertiary text-[11px] tracking-[0.22em] uppercase mb-2">
                {job.kind}
              </p>
              <h3 className="text-text-primary font-semibold text-2xl leading-snug tracking-tight">
                {job.role}
              </h3>
              <p className="font-mono text-accent text-sm mt-1">{job.company}</p>
              <p className="text-text-secondary text-sm leading-relaxed mt-3 max-w-2xl">
                {job.summary}
              </p>

              {job.highlights?.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-text-secondary text-sm leading-snug">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.tech?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-text-secondary text-xs px-2.5 py-1 rounded-md border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <Credentials />
    </SectionShell>
  );
}
