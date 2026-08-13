const linkClass =
  'inline-flex items-center gap-2 rounded-sm border border-rule-strong px-3 py-1.5 font-data ' +
  'text-[11px] text-bone transition-colors duration-150 hover:border-oxide hover:text-oxide';

function Links({ project }) {
  const { links = {}, repos, version } = project;
  const hasAny = project.private || repos || links.npm || links.github || links.live;
  if (!hasAny) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      {project.private && (
        <span className="rounded-sm border border-rule px-3 py-1.5 font-data text-[11px] text-bone-dim">
          Source withheld — commercial product
        </span>
      )}
      {links.npm && (
        <a href={links.npm} target="_blank" rel="noopener noreferrer" className={linkClass}>
          npm {version ?? ''}
        </a>
      )}
      {repos?.map((repo) => (
        <a key={repo.href} href={repo.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {repo.label}
        </a>
      ))}
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Source
        </a>
      )}
      {links.live && (
        <a href={links.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live
        </a>
      )}
    </div>
  );
}

/**
 * One build, stated as the thing it guarantees.
 *
 * Everything is on the page — no cards, no cover buttons, no drawer. The work
 * is the evidence, so hiding it behind an interaction would be working against
 * the brief.
 */
export function Build({ project }) {
  const { facts = [], highlights = [], artwork } = project;

  return (
    <article aria-labelledby={`${project.id}-name`} className="border-t border-rule pt-8 md:pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 id={`${project.id}-name`} className="font-display text-build font-semibold text-bone">
          {project.title}
        </h3>
        <p className="font-data text-[11px] text-bone-dim">{project.period}</p>
      </div>

      <p className="mt-3.5 font-data text-[11px] text-bone-dim">{project.kind}</p>

      {/* The invariant is the device the whole page is built on, so it gets the
          only oxide mark in the block. */}
      <p className="mt-7 border-l-2 border-oxide pl-5 font-display text-xl font-medium leading-snug text-bone md:text-2xl">
        {project.invariant}
      </p>

      <p className="mt-7 max-w-[62ch] leading-relaxed text-bone-dim">{project.description}</p>

      {facts.length > 0 && (
        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          {facts.map(([value, note]) => (
            <div key={note}>
              <dt className="sr-only">{note}</dt>
              <dd className="font-data text-xl text-bone">{value}</dd>
              <dd className="mt-1.5 font-data text-[11px] leading-snug text-bone-dim">{note}</dd>
            </div>
          ))}
        </dl>
      )}

      {artwork && (
        <figure className="mt-9">
          <img
            src={artwork.src}
            alt={artwork.alt}
            loading="lazy"
            decoding="async"
            className="w-full border border-rule"
          />
          <figcaption className="mt-3 font-data text-[11px] text-bone-dim">
            Output of the compiler itself, not a mockup.
          </figcaption>
        </figure>
      )}

      {highlights.length > 0 && (
        <ul className="mt-9 max-w-[68ch] space-y-3.5">
          {highlights.map((h) => (
            <li key={h} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-relaxed text-bone-dim">
              <span aria-hidden className="mt-[0.7em] h-px w-3 bg-rule-strong" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-9 font-data text-[11px] text-bone-dim">{project.stack.join('  ·  ')}</p>

      <Links project={project} />
    </article>
  );
}
