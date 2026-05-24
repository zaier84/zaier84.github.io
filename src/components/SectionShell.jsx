export function SectionShell({ id, number, label, children }) {
  return (
    <section id={id} className="border-t border-border">
      <div className="grid grid-cols-12 gap-x-6 px-6 lg:px-10 py-24 lg:py-32 max-w-6xl mx-auto">
        <header className="col-span-12 md:col-span-3 mb-10 md:mb-0">
          <div className="md:sticky md:top-24 flex flex-row md:flex-col items-baseline md:items-start gap-4 md:gap-3">
            <span className="font-mono text-text-secondary text-xs tracking-widest">
              {number}
            </span>
            <span className="font-mono text-text-mono text-xs tracking-widest uppercase">
              {label}
            </span>
          </div>
        </header>

        <div className="col-span-12 md:col-span-9 md:border-l md:border-border md:pl-8 lg:pl-14">
          {children}
        </div>
      </div>
    </section>
  );
}
