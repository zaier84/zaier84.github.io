import { motion } from 'framer-motion';
import { education, certifications } from '@/data/education';
import { projects } from '@/data/projects';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';

const toProjectEntry = (id) => {
  const p = projects.find(p => p.id === id);
  return {
    id: p.id,
    date: p.period || p.type,
    type: p.type,
    title: p.title,
    subtitle: p.tech.slice(0, 3).join(' · '),
    detail: p.highlights[0] ?? null,
  };
};

const entries = [
  toProjectEntry('erp-saas'),
  toProjectEntry('macromate'),
  ...certifications.map(c => ({
    id: c.title,
    date: c.period,
    type: 'Certification',
    title: c.title,
    subtitle: `${c.issuer} · ${c.platform}`,
    detail: null,
  })),
  ...education.map(e => ({
    id: e.institution,
    date: e.period,
    type: 'Education',
    title: e.degree,
    subtitle: `${e.institution} · ${e.location}`,
    detail: e.cgpa ? `CGPA ${e.cgpa}` : null,
  })),
];

export function Experience() {
  return (
    <SectionShell id="experience" number="03" label="Experience">
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-12"
      >
        {entries.map(entry => (
          <motion.li
            key={entry.id}
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-y-2 gap-x-8 items-baseline"
          >
            <time className="font-mono text-text-mono text-xs tracking-wide whitespace-nowrap">
              {entry.date}
            </time>

            <div>
              <p className="font-mono text-text-secondary text-xs tracking-widest uppercase mb-2">
                {entry.type}
              </p>
              <h3 className="text-text-primary font-semibold text-lg leading-snug mb-1">
                {entry.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {entry.subtitle}
              </p>
              {entry.detail && (
                <p className="font-mono text-text-mono text-xs mt-3">
                  {entry.detail}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
}
