import { motion } from 'framer-motion';
import { education, certifications } from '@/data/education';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const items = [
  ...education.map((e) => ({
    id: e.institution,
    kind: 'Education',
    title: e.degree,
    sub: `${e.institution} · ${e.location}`,
    period: e.period,
    note: e.cgpa ? `CGPA ${e.cgpa}` : null,
  })),
  ...certifications.map((c) => ({
    id: c.title,
    kind: 'Certification',
    title: c.title,
    sub: `${c.issuer} · ${c.platform}`,
    period: c.period,
    note: null,
  })),
];

/** Compact education + certifications block — credentials, not "experience". */
export function Credentials() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mt-16 pt-10 border-t border-border"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
        <span aria-hidden className="h-px w-8 bg-accent" />
        <p className="font-mono text-text-tertiary text-xs tracking-[0.25em] uppercase">
          Credentials
        </p>
      </motion.div>

      <div className="grid gap-px bg-border rounded-xl overflow-hidden border border-border">
        {items.map((it) => (
          <motion.div
            key={it.id}
            variants={fadeUp}
            className="bg-bg-surface px-5 py-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div>
              <p className="font-mono text-text-tertiary text-[11px] tracking-[0.22em] uppercase mb-1.5">
                {it.kind}
              </p>
              <h3 className="text-text-primary font-medium text-base leading-snug tracking-tight">
                {it.title}
              </h3>
              <p className="text-text-secondary text-sm mt-0.5">{it.sub}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {it.note && (
                <span className="font-mono text-text-secondary text-xs px-2.5 py-1 rounded-md border border-border">
                  {it.note}
                </span>
              )}
              <time className="font-mono text-text-tertiary text-xs whitespace-nowrap">
                {it.period}
              </time>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
