/**
 * Off the scale. Stays in the instrument register rather than reaching for a
 * segfault joke — the rest of the page never plays a terminal, so this cannot
 * either.
 */
export function NotFound() {
  return (
    <div className="mx-auto grid max-w-plate grid-cols-1 gap-y-6 px-6 py-28 md:grid-cols-[7rem_1fr] md:gap-x-10 md:px-10 md:py-40 lg:grid-cols-[9rem_1fr]">
      <div className="ruler hidden pt-[0.45rem] md:block">
        <div className="pl-5">
          <span aria-hidden className="mb-3 block h-px w-7 bg-oxide" />
          <p className="font-data text-[11px] leading-none text-bone-dim">404</p>
        </div>
      </div>

      <div>
        <h1 className="font-display max-w-[14ch] text-build font-semibold text-bone">
          Nothing is recorded at this address.
        </h1>
        <p className="mt-7 max-w-measure leading-relaxed text-bone-dim">
          The page you asked for is not part of this document.
        </p>
        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-sm border border-rule-strong px-4 py-2 font-data text-[11px] text-bone transition-colors duration-150 hover:border-oxide hover:text-oxide"
        >
          Back to the top of the plate
        </a>
      </div>
    </div>
  );
}
