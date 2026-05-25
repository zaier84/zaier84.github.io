import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.06 },
  }),
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.77.5 12 .5z" />
  </svg>
);

export function ProjectCard({ project, onClick, index, featured = false }) {
  const idx = String(index + 1).padStart(2, '0');
  const stop = (e) => e.stopPropagation();

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4 }}
      className={`group relative w-full overflow-hidden rounded-xl bg-bg-surface border border-border
                  transition-colors duration-300 ease-premium hover:border-border-strong hover:shadow-card-hover
                  flex flex-col ${featured ? 'gap-6 p-8 lg:p-10' : 'gap-5 p-6 lg:p-7'}`}
    >
      {/* Full-card affordance for opening details — sits behind the content. */}
      <button
        type="button"
        onClick={onClick}
        aria-label={`${project.title} — view details`}
        className="absolute inset-0 z-0"
      />

      {/* Generated motif: oversized ghost index, no imagery. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-8 font-display font-bold leading-none
                   text-[7rem] lg:text-[9rem] text-text-primary/[0.05] select-none"
      >
        {idx}
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Content is non-interactive so clicks fall through to the cover button;
          real links re-enable pointer events individually. */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-text-tertiary text-xs tracking-[0.2em]">{idx}</span>
          {project.period && (
            <span className="font-mono text-text-tertiary text-xs">{project.period}</span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-text-tertiary text-[11px] tracking-[0.22em] uppercase">
            {project.type}
          </p>
          <h3
            className={`font-display font-semibold text-text-primary leading-tight tracking-tight ${
              featured ? 'text-4xl lg:text-5xl' : 'text-2xl'
            }`}
          >
            {project.title}
          </h3>
        </div>

        <p
          className={`text-text-secondary leading-relaxed ${
            featured ? 'text-base max-w-2xl' : 'text-sm line-clamp-3'
          }`}
        >
          {project.description}
        </p>

        {featured && project.highlights.length > 0 && (
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2.5 text-text-secondary text-sm leading-snug">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-1">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-text-secondary text-xs px-2.5 py-1 rounded-md border border-border"
              >
                {t}
              </span>
            ))}
          </div>
          <span
            aria-hidden
            className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-accent"
          >
            <span className="hidden -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:inline">
              View
            </span>
            <Arrow />
          </span>
        </div>
      </div>

      {/* Link/badge row — above the cover button, individually clickable. */}
      <div className="relative z-10 flex items-center gap-2">
        {project.private ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-tertiary px-2.5 py-1 rounded-md border border-border">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Private · commercial
          </span>
        ) : (
          project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-secondary px-2.5 py-1 rounded-md border border-border hover:border-accent hover:text-accent transition-colors duration-200"
            >
              <GithubIcon /> Source
            </a>
          )
        )}
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-secondary px-2.5 py-1 rounded-md border border-border hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Live ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}
