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

export function ProjectCard({ project, onClick, index, featured = false }) {
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
      className={`group bg-bg-surface border border-border cursor-pointer
                  hover:border-text-mono transition-colors duration-150
                  flex flex-col gap-4 ${
                    featured ? 'p-8 lg:p-10' : 'p-6'
                  }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`text-text-primary font-semibold leading-snug ${
            featured ? 'text-2xl lg:text-3xl tracking-tight' : 'text-base'
          }`}
        >
          {project.title}
        </h3>
        {project.period && (
          <span className="font-mono text-text-mono text-xs shrink-0 mt-1">
            {project.period}
          </span>
        )}
      </div>

      <p className="font-mono text-text-mono text-xs tracking-widest uppercase">
        {project.type}
      </p>

      <p
        className={`text-text-secondary leading-relaxed flex-1 ${
          featured ? 'text-base lg:text-[15px] line-clamp-none' : 'text-sm line-clamp-3'
        }`}
      >
        {project.description}
      </p>

      <div className="flex items-end justify-between gap-4 mt-2">
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
        <span
          aria-hidden
          className="font-mono text-text-secondary text-xs shrink-0 group-hover:text-text-mono transition-colors duration-150"
        >
          →
        </span>
      </div>
    </motion.article>
  );
}
