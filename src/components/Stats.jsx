import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { stats } from '@/data/stats';

function Counter({ value, suffix }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return undefined;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tnum">
      {n}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="By the numbers" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="flex flex-col gap-3"
            >
              {/* Assistive tech gets the settled figure; the animating one is
                  hidden so a mid-count number is never announced. */}
              <dd className="sr-only">
                {s.value}{s.suffix} {s.label.replace('\n', ' ')}
              </dd>
              <dd
                aria-hidden
                className="font-display font-semibold text-text-primary text-5xl lg:text-6xl tracking-tight leading-none"
              >
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt
                aria-hidden
                className="font-mono text-text-tertiary text-xs leading-relaxed tracking-wide whitespace-pre-line"
              >
                {s.label}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
