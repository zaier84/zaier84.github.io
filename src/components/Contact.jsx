import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile, socialLinks } from '@/data/profile';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const inputClass =
  'w-full bg-transparent border-b border-border text-text-primary text-sm py-2.5 font-mono ' +
  'placeholder:text-text-secondary focus:border-text-mono focus:outline-none ' +
  'transition-colors duration-150';

const labelClass =
  'block font-mono text-text-secondary text-xs tracking-widest uppercase mb-2';

export function Contact() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <SectionShell id="contact" number="04" label="Connect">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          variants={fadeUp}
          className="text-text-primary text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl"
        >
          Always open to interesting conversations, new opportunities, and
          collaboration. Whether it&apos;s a project idea, a role, or just a
          hello — I&apos;d love to hear from you.
        </motion.p>

        <motion.address variants={fadeUp} className="not-italic space-y-3 mb-16">
          {socialLinks.map(({ label, display, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="flex items-center gap-4 border border-border px-4 py-3 group
                         hover:border-text-mono transition-colors duration-150 max-w-md"
            >
              <span className="font-mono text-text-mono text-xs w-16 shrink-0">
                {label}
              </span>
              <span className="font-mono text-text-secondary text-sm flex-1
                               group-hover:text-text-primary transition-colors duration-150">
                {display}
              </span>
              <span className="font-mono text-text-secondary text-xs
                               group-hover:text-text-mono transition-colors duration-150">
                →
              </span>
            </a>
          ))}
        </motion.address>

        {FORMSPREE_ID && (
          <motion.div variants={fadeUp}>
            <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-6">
              Or send a message
            </p>

            {status === 'success' ? (
              <div className="py-8 max-w-md">
                <p className="font-mono text-text-mono text-sm mb-2">
                  Message sent.
                </p>
                <p className="text-text-secondary text-sm">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7 max-w-md">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="What's on your mind?"
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong. Try emailing directly at{' '}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="underline hover:text-red-300 transition-colors duration-150"
                    >
                      {profile.contact.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full font-mono text-sm border border-accent text-accent py-3
                             hover:bg-accent hover:text-bg-primary transition-colors duration-150
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
