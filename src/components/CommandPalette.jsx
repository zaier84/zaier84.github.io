import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command } from 'cmdk';
import { useTheme } from '@/context/ThemeContext';
import { profile } from '@/data/profile';
import { EASE } from '@/lib/motion';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Fire this anywhere to open the palette: `openCommandPalette()`. */
export function openCommandPalette() {
  window.dispatchEvent(new Event('command-palette:open'));
}

function Row({ children, shortcut, onSelect, value }) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm
                 text-text-secondary cursor-pointer
                 data-[selected=true]:bg-bg-elevated data-[selected=true]:text-text-primary
                 transition-colors duration-150"
    >
      <span className="flex items-center gap-3 font-mono">{children}</span>
      {shortcut && (
        <kbd className="font-mono text-[10px] text-text-tertiary tracking-wide">{shortcut}</kbd>
      )}
    </Command.Item>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('command-palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('command-palette:open', onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const run = (fn) => () => { fn(); setOpen(false); };

  const goTo = (id) => () => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', `#${id}`);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong
                       bg-bg-surface shadow-card-hover"
          >
            <Command
              label="Command palette"
              className="flex flex-col"
              loop
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <span className="font-mono text-accent text-sm">/</span>
                <Command.Input
                  ref={inputRef}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-4 font-mono text-sm text-text-primary
                             placeholder:text-text-tertiary focus:outline-none"
                />
                <kbd className="hidden sm:block font-mono text-[10px] text-text-tertiary border border-border rounded px-1.5 py-0.5">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[min(50vh,340px)] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-text-tertiary">
                  No results.
                </Command.Empty>

                <Command.Group
                  heading="Navigate"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-text-tertiary"
                >
                  {NAV.map((n) => (
                    <Row key={n.id} value={`go ${n.label}`} onSelect={goTo(n.id)} shortcut="↵">
                      <span className="text-text-tertiary">→</span> {n.label}
                    </Row>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-text-tertiary"
                >
                  <Row value="toggle theme appearance" onSelect={run(toggleTheme)}>
                    <span className="text-text-tertiary">◑</span>
                    Switch to {theme === 'dark' ? 'light' : 'dark'} theme
                  </Row>
                  <Row value="copy email address" onSelect={copyEmail}>
                    <span className="text-text-tertiary">@</span>
                    {copied ? 'Copied!' : 'Copy email'}
                  </Row>
                  <Row
                    value="download resume cv"
                    onSelect={run(() => window.open('/Zaier_Ahmad_Resume.pdf', '_blank'))}
                  >
                    <span className="text-text-tertiary">↓</span> Download résumé
                  </Row>
                </Command.Group>

                <Command.Group
                  heading="Elsewhere"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-text-tertiary"
                >
                  <Row
                    value="github profile code"
                    onSelect={run(() => window.open(profile.contact.github, '_blank'))}
                    shortcut="↗"
                  >
                    <span className="text-text-tertiary">⌥</span> GitHub
                  </Row>
                  <Row
                    value="linkedin profile"
                    onSelect={run(() => window.open(profile.contact.linkedin, '_blank'))}
                    shortcut="↗"
                  >
                    <span className="text-text-tertiary">⌥</span> LinkedIn
                  </Row>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
