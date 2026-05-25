import { profile, socialLinks } from '@/data/profile';
import { useLocalTime } from '@/lib/useLocalTime';

export function Footer() {
  const brand = profile.name.split(' ').slice(-2).join(' ');
  const time = useLocalTime('Asia/Karachi');

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <a
            href="#hero"
            className="group w-fit font-mono text-sm font-medium tracking-wide"
          >
            <span className="text-accent">/</span>
            <span className="ml-1 text-text-primary transition-colors duration-200 group-hover:text-accent">
              {brand}
            </span>
          </a>
          <p className="font-mono text-text-tertiary text-xs">
            &copy; {new Date().getFullYear()} — Built with React, shaders &amp; Tailwind
          </p>
          <p className="font-mono text-text-tertiary text-xs tnum">
            Lahore · {time} · all systems nominal
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-1">
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="block font-mono text-text-secondary text-xs px-3 py-2 rounded-lg hover:text-text-primary hover:bg-bg-surface transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#hero"
                aria-label="Back to top"
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-accent hover:border-border-strong transition-colors duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
