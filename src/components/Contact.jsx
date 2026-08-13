import { socialLinks } from '@/data/profile';
import { Section } from '@/components/Section';

/**
 * Direct addresses only. The email is on the page, so a contact form would be
 * a second, slower path to the same inbox — and one more thing to maintain.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      label="contact"
      labelAs="p"
      className="border-t border-rule py-16 md:py-24"
    >
      <h2 className="font-display max-w-[18ch] text-build font-semibold text-bone">
        If something in your stack has to be correct, I want to hear about it.
      </h2>

      <p className="mt-7 max-w-measure leading-relaxed text-bone-dim">
        Open to backend and systems roles, remote or in Lahore. A schema that
        will not normalise, a transaction boundary that leaks, a service losing
        money on retries — that is the conversation.
      </p>

      <ul className="mt-12 max-w-measure">
        {socialLinks.map(({ label, display, href }) => (
          <li key={label} className="border-t border-rule">
            <a
              href={href}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group flex items-baseline gap-6 py-4 transition-colors duration-150 hover:text-oxide"
            >
              <span className="w-16 shrink-0 font-data text-[11px] text-bone-dim">{label}</span>
              <span className="min-w-0 flex-1 truncate font-data text-sm text-bone group-hover:text-oxide">
                {display}
              </span>
              <span aria-hidden className="font-data text-sm text-bone-dim group-hover:text-oxide">
                ↗
              </span>
            </a>
          </li>
        ))}
        <li className="border-t border-rule">
          <a
            href="/Zaier_Ahmad_Resume.pdf"
            className="group flex items-baseline gap-6 py-4 transition-colors duration-150 hover:text-oxide"
          >
            <span className="w-16 shrink-0 font-data text-[11px] text-bone-dim">Résumé</span>
            <span className="min-w-0 flex-1 truncate font-data text-sm text-bone group-hover:text-oxide">
              PDF, one page
            </span>
            <span aria-hidden className="font-data text-sm text-bone-dim group-hover:text-oxide">
              ↓
            </span>
          </a>
        </li>
      </ul>
    </Section>
  );
}
