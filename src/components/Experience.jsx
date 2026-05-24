import { motion } from 'framer-motion';
import { education, certifications } from '@/data/education';
import { projects } from '@/data/projects';

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

// Chronological career story — OCR & Interpreter live in the Projects section only
const entries = [
  ...education.map(e => ({
    id: e.institution,
    date: e.period,
    type: 'Education',
    title: e.degree,
    subtitle: `${e.institution} · ${e.location}`,
    detail: e.cgpa ? `CGPA ${e.cgpa}` : null,
  })),
  ...certifications.map(c => ({
    id: c.title,
    date: c.period,
    type: 'Certification',
    title: c.title,
    subtitle: `${c.issuer} · ${c.platform}`,
    detail: null,
  })),
  toProjectEntry('macromate'),
  toProjectEntry('erp-saas'),
];

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24 max-w-5xl mx-auto border-t border-border">
      <h2 className="font-mono text-text-mono text-xs tracking-widest uppercase mb-16">
        <span className="text-text-secondary mr-3">03</span>
        <span>Experience</span>
      </h2>

      <div className="relative">
        {/* Vertical line — left-side on mobile, centered on desktop */}
        <div className="absolute left-1 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-14">
          {entries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative pl-8 md:pl-0"
              >
                {/* Dot */}
                <div className="absolute left-0 top-[7px] w-2 h-2 bg-text-mono md:left-1/2 md:-translate-x-1/2" />

                {/* Card */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    isLeft
                      ? 'md:mr-auto md:pr-6 md:text-right'
                      : 'md:ml-auto md:pl-6'
                  }`}
                >
                  {/* Date badge */}
                  <time className="inline-block font-mono text-text-mono text-xs border border-text-mono px-2 py-0.5 mb-3">
                    {entry.date}
                  </time>

                  {/* Type */}
                  <p className="font-mono text-text-secondary text-xs tracking-widest uppercase mb-1">
                    {entry.type}
                  </p>

                  {/* Title */}
                  <h3 className="text-text-primary font-semibold text-base leading-snug mb-1">
                    {entry.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-text-secondary text-sm">
                    {entry.subtitle}
                  </p>

                  {/* Detail */}
                  {entry.detail && (
                    <p className="font-mono text-text-mono text-xs mt-2">
                      {entry.detail}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
