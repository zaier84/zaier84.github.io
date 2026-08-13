import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { Section } from '@/components/Section';
import { Build } from '@/components/Build';

export function Builds() {
  return (
    <Section id="work" label="work" className="pb-20 md:pb-28">
      {/* The bio, as a margin note rather than a section of its own. Evidence
          first: the work is what a reader came for. */}
      <p className="mb-14 max-w-measure border-l-2 border-rule-strong pl-5 text-sm leading-relaxed text-bone-dim">
        {profile.note}
      </p>

      <div className="space-y-16 md:space-y-24">
        {projects.map((project) => (
          <Build key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
