import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDrawer } from '@/components/ProjectDrawer';

const FILTERS = ['All', 'Node.js', 'Python', 'Go', 'Flutter'];


export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.tech.includes(activeFilter));

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="px-6 py-24 max-w-5xl mx-auto border-t border-border">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="font-mono text-text-mono text-xs tracking-widest uppercase mb-16"
      >
        <span className="text-text-secondary mr-3">02</span>
        <span>Projects</span>
      </motion.h2>

      <div className="flex gap-2 flex-wrap mb-12">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`relative font-mono text-xs px-3 py-1.5 transition-colors duration-150 ${
              activeFilter === filter
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {activeFilter === filter && (
              <motion.span
                layoutId="active-filter"
                className="absolute inset-0 border border-text-mono"
                transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
