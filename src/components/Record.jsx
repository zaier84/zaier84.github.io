import { experience } from '@/data/experience';
import { education, certifications } from '@/data/education';
import { skills } from '@/data/skills';
import { Section } from '@/components/Section';

function Row({ period, start, title, sub, aside }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-rule py-6 sm:grid-cols-[10rem_1fr] md:py-7">
      <time dateTime={start} className="font-data text-[11px] text-bone-dim sm:pt-1">
        {period}
      </time>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-snug text-bone">{title}</h3>
          <p className="mt-1 font-data text-[11px] text-bone-dim">{sub}</p>
        </div>
        {aside && <p className="font-data text-[11px] text-bone-dim">{aside}</p>}
      </div>
    </div>
  );
}

/**
 * The record: roles and credentials, kept terse on purpose.
 *
 * fin-erp is already covered in full under Work. Restating its highlights here
 * is what made the previous version read as a loop, so this section carries
 * only what Work does not: dates, institution, and the one-line summary.
 */
export function Record() {
  return (
    <Section id="record" label="record" className="border-t border-rule py-16 md:py-24">
      <div>
        {experience.map((job) => (
          <div key={job.role}>
            <Row
              period={job.period}
              start={job.start}
              title={job.role}
              sub={job.company}
              aside={job.location}
            />
            <p className="max-w-[62ch] pb-2 leading-relaxed text-bone-dim sm:pl-[calc(10rem+2.5rem)]">
              {job.summary}
            </p>
          </div>
        ))}

        {education.map((e) => (
          <Row
            key={e.institution}
            period={e.period}
            start={e.start}
            title={e.degree}
            sub={`${e.institution} · ${e.location}`}
            aside={e.cgpa ? `CGPA ${e.cgpa}` : null}
          />
        ))}

        {certifications.map((c) => (
          <Row
            key={c.title}
            period={c.period}
            start={c.start}
            title={c.title}
            sub={`${c.issuer} · ${c.platform}`}
          />
        ))}
      </div>

      {/* The equipment list. Set as running text rather than a wall of pills:
          these are things used, not badges earned. */}
      <dl className="mt-14 border-t border-rule-strong pt-8">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-x-10 gap-y-1 py-3 sm:grid-cols-[10rem_1fr]"
          >
            <dt className="font-data text-[11px] text-oxide">{group.category}</dt>
            <dd className="font-data text-[11px] leading-relaxed text-bone-dim">
              {group.items.join('  ·  ')}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
