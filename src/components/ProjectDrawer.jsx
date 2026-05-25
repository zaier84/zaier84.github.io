import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const panelStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function ProjectDrawer({ project, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4, ease: EASE }}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-bg-surface
                   border-l border-border z-50 flex flex-col sm:rounded-l-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-border shrink-0">
          <p className="font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase">
            {project.type}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 -mr-1 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <motion.div
          variants={panelStagger}
          initial="hidden"
          animate="visible"
          className="px-7 py-8 space-y-8 flex-1 overflow-y-auto"
        >
          <motion.div variants={item}>
            <h2 className="font-display text-text-primary text-3xl font-semibold tracking-tight leading-tight mb-2">
              {project.title}
            </h2>
            {project.period && (
              <p className="font-mono text-text-tertiary text-xs">{project.period}</p>
            )}
          </motion.div>

          <motion.p variants={item} className="text-text-secondary text-sm leading-relaxed">
            {project.description}
          </motion.p>

          {project.highlights.length > 0 && (
            <motion.div variants={item}>
              <p className="font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase mb-4">
                Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div variants={item}>
            <p className="font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase mb-4">
              Stack
            </p>
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
          </motion.div>

          {project.private && (
            <motion.div variants={item}>
              <p className="inline-flex items-center gap-2 font-mono text-text-tertiary text-xs px-3 py-2 rounded-lg border border-border">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Private — commercial product, source closed
              </p>
            </motion.div>
          )}

          {Object.keys(project.links).length > 0 && (
            <motion.div variants={item}>
              <p className="font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase mb-4">
                Links
              </p>
              <div className="flex flex-wrap gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-text-primary px-4 py-2 rounded-lg border border-border-strong hover:border-accent hover:text-accent transition-colors duration-200"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors duration-200"
                  >
                    Live →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.aside>
    </>
  );
}
