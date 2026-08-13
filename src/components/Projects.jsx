import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDrawer } from '@/components/ProjectDrawer';
import { SectionShell } from '@/components/SectionShell';
import { useScrollLock } from '@/lib/useScrollLock';

const matchesFilter = (project, filter) =>
  filter === 'All' || project.tech.includes(filter);

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Drop any configured chip that no longer matches a project, so editing
  // `projects.js` can never leave a filter that returns an empty grid.
  const filters = useMemo(
    () => projectFilters.filter((f) => projects.some((p) => matchesFilter(p, f))),
    []
  );

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));
  const featured = activeFilter === 'All' ? filtered.find((p) => p.featured) : null;
  const rest = featured ? filtered.filter((p) => p !== featured) : filtered;

  useScrollLock(Boolean(selectedProject));

  useEffect(() => {
    if (!selectedProject) return undefined;
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProject]);

  return (
    <SectionShell id="projects" number="02" label="Projects">
      {/* Toggle buttons, not tabs: there is no tabpanel and no roving tabindex,
          so `aria-pressed` describes what these actually do. */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`relative font-mono text-xs px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
              activeFilter === filter
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {activeFilter === filter && (
              <motion.span
                layoutId="active-filter"
                className="absolute inset-0 rounded-full bg-bg-elevated border border-border-strong"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        ))}
      </div>

      <p role="status" className="font-mono text-text-tertiary text-xs mb-8">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        {activeFilter !== 'All' && ` using ${activeFilter}`}
      </p>

      {/* One keyed child so the exit animation actually runs — AnimatePresence
          only tracks direct, keyed children. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {featured && (
            <div className="mb-5 lg:mb-6">
              <ProjectCard
                project={featured}
                index={0}
                featured
                onClick={() => setSelectedProject(featured)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={featured ? i + 1 : i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </motion.div>
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
