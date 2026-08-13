import { useEffect } from 'react';

// Single source of truth for locking page scroll behind overlays.
//
// Three components (project drawer, command palette, mobile menu) can be open
// in overlapping combinations. Each one setting `body.overflow` directly meant
// whichever closed *first* unlocked the page while another was still open, so
// the lock is refcounted here instead.
//
// The scrollbar's width is replaced with padding so locking doesn't shift the
// layout horizontally.

let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

function lock() {
  if (lockCount === 0) {
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    previousOverflow = body.style.overflow;
    previousPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }
  }
  lockCount += 1;
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
}

/** Locks body scroll while `active` is true. Safe to nest across components. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return unlock;
  }, [active]);
}
