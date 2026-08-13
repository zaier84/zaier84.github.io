/**
 * The page's structural unit: a measured interval on the plate.
 *
 * The left column is the gutter, and it is the whole structural device. It
 * carries a continuous ruler (hairline plus minor ticks, drawn in CSS) and a
 * major tick at the top of each section with its name. Because every section
 * renders one, the measure runs unbroken down the page and stays locked to the
 * content grid — which is why there are no section numbers anywhere: position
 * on the rule already says where you are.
 *
 * `labelAs` decides whether the gutter name is the section's heading. Where the
 * content supplies its own heading — the thesis and the contact line — the
 * gutter name drops to a paragraph so the document outline stays valid and the
 * section is named by `aria-label` instead.
 */
export function Section({ id, label, children, className = '', labelAs = 'h2' }) {
  const LabelTag = labelAs;
  const isHeading = labelAs !== 'p';

  return (
    <section id={id} className={className} {...(!isHeading && label ? { 'aria-label': label } : {})}>
      <div className="mx-auto grid max-w-plate grid-cols-1 gap-y-6 px-6 md:grid-cols-[7rem_1fr] md:gap-x-10 md:px-10 lg:grid-cols-[9rem_1fr]">
        <div className="ruler hidden pt-[0.45rem] md:block">
          {label && (
            <div className="pl-5">
              <span aria-hidden className="mb-3 block h-px w-7 bg-oxide" />
              <LabelTag className="font-data text-[11px] leading-none text-bone-dim">
                {label}
              </LabelTag>
            </div>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
