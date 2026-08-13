/**
 * The signature.
 *
 * A beam with a pan at each end, tilted at rest and settling into equilibrium
 * once on load. It is the trial-balance invariant drawn as an instrument, and
 * it is the only animation on the site — it never loops and never replays.
 * Under `prefers-reduced-motion` the CSS renders it already level.
 */
export function BalanceBar() {
  return (
    <figure className="mt-12 max-w-measure md:mt-16">
      <svg
        viewBox="0 0 420 74"
        role="img"
        aria-label="A balance beam resting level: debits equal credits."
        className="w-full text-bone"
      >
        <g className="beam" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="34" y1="26" x2="386" y2="26" />
          <line x1="34" y1="16" x2="34" y2="36" />
          <line x1="386" y1="16" x2="386" y2="36" />
        </g>

        {/* Fulcrum and pivot stay put; only the beam moves. */}
        <polygon points="210,32 200,58 220,58" fill="currentColor" opacity="0.5" />
        <line x1="180" y1="58" x2="240" y2="58" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="210" cy="26" r="3.5" fill="var(--oxide)" />
      </svg>

      <figcaption className="mt-4 flex items-baseline justify-between font-data text-[11px] text-bone-dim">
        <span>debit</span>
        <span className="text-oxide">balanced</span>
        <span>credit</span>
      </figcaption>
    </figure>
  );
}
