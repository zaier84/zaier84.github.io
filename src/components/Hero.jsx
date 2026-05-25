import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/profile';
import { blurReveal, lineChild } from '@/lib/motion';
import { useScramble } from '@/lib/useScramble';
import { useLocalTime } from '@/lib/useLocalTime';
import { useTheme } from '@/context/ThemeContext';
import { MagneticButton } from './MagneticButton';
import { ShaderField } from './ShaderField';

const ROLES = ['Backend Engineer', 'API Architect', 'Systems Engineer', 'SaaS Founder'];

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const headline = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export function Hero() {
  const city = profile.location.split(',')[0];
  const words = profile.name.split(' ');
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const time = useLocalTime('Asia/Karachi');

  // Cycling, self-decoding role line.
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleText, playRole] = useScramble(ROLES[roleIdx], { auto: false, speed: 1.4 });
  const [label] = useScramble(profile.title, { delay: 350, speed: 1.2 });

  useEffect(() => {
    playRole();
  }, [roleIdx, playRole]);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(
      () => setRoleIdx((i) => (i + 1) % ROLES.length),
      2800
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-24">
      {/* WebGL flow-field — remounts on theme change to re-read the palette. */}
      <ShaderField key={theme} className="absolute inset-0 -z-20" intensity={0.9} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--shader-scrim)' }}
      />

      <div className="flex flex-col justify-center min-h-[92vh] px-6 lg:px-10 py-28 max-w-6xl mx-auto">
        <motion.div variants={heroContainer} initial="hidden" animate="visible">
          <motion.p
            variants={blurReveal}
            className="flex items-center gap-3 font-mono text-text-secondary text-xs tracking-[0.25em] uppercase mb-8"
          >
            <span className="h-px w-6 bg-accent" />
            <span>{city}</span>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary">{label}</span>
          </motion.p>

          <motion.h1
            variants={headline}
            className="font-display font-medium text-text-primary leading-[0.92] tracking-tight mb-8 text-display-lg"
          >
            {words.map((word, i) => (
              <span key={i} className="reveal-mask pb-[0.06em]">
                <motion.span variants={lineChild} className="block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={blurReveal}
            className="font-mono text-sm tracking-wide mb-8 h-5"
            aria-live="off"
          >
            <span className="text-accent">{'> '}</span>
            <span className="text-text-primary">{roleText}</span>
            <span className="ml-0.5 inline-block w-2 h-4 -mb-0.5 bg-accent animate-pulse" aria-hidden />
          </motion.p>

          <motion.p
            variants={blurReveal}
            className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={blurReveal} className="flex flex-wrap items-center gap-3 mb-12">
            <MagneticButton
              as="a"
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent text-white px-6 py-3 font-mono text-sm hover:bg-accent-hover transition-colors duration-200"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/Zaier_Ahmad_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong text-text-primary px-6 py-3 font-mono text-sm hover:border-accent hover:text-accent transition-colors duration-200"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Living status line — reinforces the "system" concept. */}
          <motion.div
            variants={blurReveal}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-text-tertiary"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-text-secondary">Currently — building a multi-tenant ERP</span>
            </span>
            <span className="tnum">{city} · {time}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-tertiary">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
