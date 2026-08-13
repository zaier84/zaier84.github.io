import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile, socialLinks } from '@/data/profile';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { SectionShell } from '@/components/SectionShell';
import { MagneticButton } from '@/components/MagneticButton';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const inputClass =
  'w-full bg-transparent border-b border-border-strong text-text-primary text-sm py-2.5 font-mono ' +
  'placeholder:text-text-tertiary focus:border-accent focus:outline-none ' +
  'transition-colors duration-200';

const labelClass =
  'block font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase mb-2';

export function Contact() {
  const [status, setStatus] = useState('idle');
  const successRef = useRef(null);

  // The form unmounts on success, which would otherwise drop focus to <body>.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <SectionShell id="contact" number="04" label="Contact">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-text-tertiary text-xs tracking-[0.22em] uppercase">
            Available for new work
          </span>
        </motion.div>

        <motion.h3
          variants={fadeUp}
          className="font-display text-text-primary text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] mb-6 max-w-xl"
        >
          Let&apos;s talk about the hard part.
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary text-base lg:text-lg leading-relaxed mb-12 max-w-2xl"
        >
          I&apos;m open to backend and systems roles, remote or on-site in Lahore.
          If you have a schema that won&apos;t normalise, a transaction boundary
          that leaks, or a service that needs to stop losing money on retries —
          that&apos;s the conversation I want.
        </motion.p>

        <motion.address variants={fadeUp} className="not-italic grid gap-2.5 mb-12 max-w-md">
          {socialLinks.map(({ label, display, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group flex items-center gap-4 rounded-lg border border-border bg-bg-elevated px-4 py-3.5
                         hover:border-border-strong transition-colors duration-200"
            >
              <span className="font-mono text-text-tertiary text-xs w-16 shrink-0 tracking-wide">
                {label}
              </span>
              {/* min-w-0 + truncate: the LinkedIn slug is 27 unbreakable mono
                  characters and overflows the row below ~360px without it. */}
              <span className="font-mono text-text-secondary text-sm flex-1 min-w-0 truncate group-hover:text-text-primary transition-colors duration-200">
                {display}
              </span>
              <span
                aria-hidden
                className="font-mono text-text-tertiary text-sm transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          ))}
        </motion.address>

        {FORMSPREE_ID && (
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-7">
              <span aria-hidden className="h-px w-8 bg-accent" />
              <p className="font-mono text-text-tertiary text-xs tracking-[0.25em] uppercase">
                Or send a message
              </p>
            </div>

            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="py-8 max-w-md focus:outline-none"
              >
                <p className="font-mono text-accent text-sm mb-2">Message sent.</p>
                <p className="text-text-secondary text-sm">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Name</label>
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
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
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
                  <label htmlFor="contact-message" className={labelClass}>Message</label>
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
                  <p
                    role="alert"
                    className="font-mono text-xs text-text-secondary border-l-2 border-accent pl-3"
                  >
                    Something went wrong. Try emailing directly at{' '}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      {profile.contact.email}
                    </a>
                    .
                  </p>
                )}

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === 'submitting'}
                  strength={0.2}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent-strong text-accent-fg py-3 font-mono text-sm
                             hover:bg-accent-strong-hover transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </MagneticButton>
              </form>
            )}
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
