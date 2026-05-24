import { motion } from 'framer-motion';

export function ProjectDrawer({ project, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-bg-surface
                   border-l border-border z-50 overflow-y-auto flex flex-col"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-border shrink-0">
          <p className="font-mono text-text-mono text-xs tracking-widest uppercase">
            {project.type}
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-mono text-text-secondary text-xs hover:text-text-primary transition-colors duration-150"
          >
            [ esc ]
          </button>
        </div>

        <div className="px-8 py-8 space-y-8 flex-1">
          <div>
            <h2 className="text-text-primary text-xl font-semibold mb-1">
              {project.title}
            </h2>
            {project.period && (
              <p className="font-mono text-text-secondary text-xs">{project.period}</p>
            )}
          </div>

          <p className="text-text-secondary text-sm leading-relaxed">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <div>
              <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-4">
                Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                    <span className="text-text-mono font-mono shrink-0 mt-0.5">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-4">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="font-mono text-text-secondary text-xs px-3 py-1.5 border border-border cursor-default select-none"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {Object.keys(project.links).length > 0 && (
            <div>
              <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-4">
                Links
              </p>
              <div className="flex flex-col gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-text-secondary text-sm hover:text-text-primary transition-colors duration-150"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-text-secondary text-sm hover:text-text-primary transition-colors duration-150"
                  >
                    Live →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
