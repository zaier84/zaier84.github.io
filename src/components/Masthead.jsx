import { useTheme } from '@/context/ThemeContext';
import { profile } from '@/data/profile';
import { navLinks, sectionIds } from '@/data/nav';
import { useActiveSection } from '@/lib/useActiveSection';

/**
 * Flat, ruled, always the same. No backdrop blur and no scroll-state change —
 * the masthead is part of the plate, not a floating chrome layer.
 *
 * On narrow screens the destinations move to a second row rather than into a
 * drawer, which keeps the whole site free of overlays.
 */
export function Masthead() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(sectionIds);
  const surname = profile.name.split(' ').slice(-2).join(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ground">
      <div className="mx-auto flex max-w-plate items-center justify-between gap-6 px-6 py-3.5 md:px-10">
        <a href="#thesis" className="font-data text-sm text-bone hover:text-oxide">
          {surname}
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map(({ label, href, id }) => (
              <li key={id}>
                <a
                  href={href}
                  aria-current={active === id ? 'location' : undefined}
                  className={`font-data text-[11px] transition-colors duration-150 hover:text-oxide ${
                    active === id ? 'text-oxide' : 'text-bone-dim'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === 'light'}
          className="font-data text-[11px] text-bone-dim transition-colors duration-150 hover:text-oxide"
        >
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </div>

      <nav aria-label="Sections, compact" className="border-t border-rule md:hidden">
        <ul className="mx-auto flex max-w-plate items-center gap-6 overflow-x-auto px-6 py-2.5">
          {navLinks.map(({ label, href, id }) => (
            <li key={id}>
              <a
                href={href}
                aria-current={active === id ? 'location' : undefined}
                className={`font-data text-[11px] whitespace-nowrap ${
                  active === id ? 'text-oxide' : 'text-bone-dim'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
