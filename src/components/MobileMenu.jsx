import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

export function MobileMenu({ isOpen, onClose, links, active }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
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
                ref={closeRef}
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <ul className="space-y-1">
              {links.map(({ label, href, id }, i) => {
                const isActive = active === id;
                return (
                  <li key={label}>
                    <motion.a
                      href={href}
                      onClick={onClose}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: EASE }}
                      className={`flex items-baseline justify-between py-3 font-mono text-lg tracking-wide transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="font-mono text-xs text-text-tertiary">
                        0{i + 1}
                      </span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
