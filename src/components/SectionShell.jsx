import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

export function SectionShell({ id, number, label, children }) {
  return (
    <section id={id} className="border-t border-border scroll-mt-24">
      <div className="grid grid-cols-12 gap-x-6 px-6 lg:px-10 py-20 md:py-24 lg:py-32 max-w-6xl mx-auto">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="col-span-12 md:col-span-3 mb-12 md:mb-0"
        >
          <div className="md:sticky md:top-28 flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-5">
            <span className="font-mono text-text-tertiary text-xs tracking-[0.3em]">
              {number}
            </span>
            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-4">
              <span aria-hidden className="h-px w-8 bg-accent md:w-10" />
              <h2 className="font-mono text-text-primary text-xs tracking-[0.25em] uppercase">
                {label}
              </h2>
            </div>
          </div>
        </motion.header>

        <div className="col-span-12 md:col-span-9 md:border-l md:border-border md:pl-8 lg:pl-16">
          {children}
        </div>
      </div>
    </section>
  );
}
