import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { useScrollLock } from '@/lib/useScrollLock';

export function MobileMenu({ isOpen, onClose, links, active }) {
  const panelRef = useFocusTrap(isOpen);
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    // The panel is md:hidden. Without this, widening the window past the
    // breakpoint hides it while leaving the scroll lock engaged, and the page
    // becomes unscrollable with no visible way to close.
    const mq = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = (e) => {
      if (e.matches) onClose();
    };

    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onBreakpoint);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="fixed top-0 right-0 h-full w-[min(20rem,85vw)] bg-bg-surface z-50 flex flex-col px-8 py-8 border-l border-border md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-mono text-text-tertiary text-xs tracking-widest uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {links.map(({ label, href, id }, i) => {
                  const isActive = active === id;
                  return (
                    <li key={label}>
                      <motion.a
                        href={href}
                        onClick={onClose}
                        aria-current={isActive ? 'location' : undefined}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: EASE }}
                        className={`flex items-baseline justify-between py-3 font-mono text-lg tracking-wide transition-colors duration-200 ${
                          isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="font-mono text-xs text-text-tertiary">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
