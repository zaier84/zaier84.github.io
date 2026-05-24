import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDrawer } from '@/components/ProjectDrawer';
import { SectionShell } from '@/components/SectionShell';

const FILTERS = ['All', 'Node.js', 'Python', 'Go', 'Flutter'];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.tech.includes(activeFilter));

  const featured = activeFilter === 'All' ? filtered.find(p => p.featured) : null;
  const rest = featured ? filtered.filter(p => p !== featured) : filtered;

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
    <SectionShell id="projects" number="02" label="Projects">
      <div role="tablist" aria-label="Filter projects by technology" className="flex gap-2 flex-wrap mb-10">
        {FILTERS.map(filter => (
          <button
            key={filter}
            role="tab"
            aria-selected={activeFilter === filter}
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

      <AnimatePresence mode="popLayout">
        {featured && (
          <div className="mb-6">
            <ProjectCard
              key={featured.id}
              project={featured}
              index={0}
              featured
              onClick={() => setSelectedProject(featured)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={featured ? i + 1 : i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
