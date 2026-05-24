import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export function ProjectCard({ project, onClick, index }) {
  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-bg-surface border border-border p-6 cursor-pointer
                 hover:border-text-mono transition-colors duration-150
                 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-text-primary text-base font-semibold leading-snug">
          {project.title}
        </h3>
        {project.period && (
          <span className="font-mono text-text-mono text-xs shrink-0">
            {project.period}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <p className="font-mono text-text-mono text-xs tracking-wide uppercase">
          {project.type}
        </p>
        {project.featured && (
          <span className="font-mono text-text-mono text-[10px] tracking-widest uppercase border border-text-mono px-2 py-0.5">
            Featured
          </span>
        )}
      </div>

      <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 flex-1">
        {project.description}
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
    </motion.article>
  );
}
