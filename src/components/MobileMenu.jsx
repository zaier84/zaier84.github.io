import { AnimatePresence, motion } from 'framer-motion';

export function MobileMenu({ isOpen, onClose, links }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed top-0 right-0 h-full w-72 bg-bg-surface z-50 flex flex-col px-8 py-10 border-l border-border"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="self-end text-text-secondary hover:text-text-primary transition-colors duration-150 p-1 mb-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <ul className="space-y-8">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={onClose}
                    className="font-mono text-text-primary text-sm tracking-wide hover:text-text-mono transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
