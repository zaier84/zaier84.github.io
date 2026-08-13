import { stats } from '@/data/stats';
import { Section } from '@/components/Section';

/**
 * The instrument panel. Static readouts, not counters — a number that animates
 * up from zero is a decoration, and these figures are the strongest evidence on
 * the page. They should be legible the instant they are on screen.
 */
export function Readouts() {
  return (
    <Section id="measures" label="measures" className="border-t border-rule py-16 md:py-24">
      <p className="mb-10 max-w-measure font-data text-[11px] leading-relaxed text-bone-dim">
        All figures below are fin-erp, measured — not estimated.
      </p>

      {/* The first figure is far longer than the rest, so it gets a wider
          track instead of forcing every readout down a size. */}
      <dl className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
        {stats.map((s) => (
          <div key={s.unit} className="border-t border-rule-strong pt-5">
            <dd className="font-display text-readout font-semibold tabular-nums text-bone">
              {s.value}
            </dd>
            <dt className="mt-2 font-data text-xs text-oxide">{s.unit}</dt>
            <dd className="mt-2 font-data text-[11px] leading-snug text-bone-dim">{s.note}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
