import { profile, socialLinks } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="font-mono text-text-secondary text-xs">
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
      <nav aria-label="Social links">
        <ul className="flex items-center gap-6">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                className="font-mono text-text-secondary text-xs hover:text-text-primary transition-colors duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
