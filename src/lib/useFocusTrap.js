import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Keeps keyboard focus inside an overlay for as long as it is open, and puts
 * focus back where it came from on close.
 *
 * Any element carrying `aria-modal="true"` tells assistive tech that the rest
 * of the page is inert. Without a trap that promise is false — Tab walks
 * straight out into content the screen reader has been told does not exist.
 *
 * @param {boolean} active   whether the overlay is currently open
 * @param {object}  options
 * @param {boolean} options.autoFocus  move focus to the first focusable child
 *                                     on open (default true)
 */
export function useFocusTrap(active, { autoFocus = true } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const node = containerRef.current;
    if (!node) return undefined;

    const previouslyFocused = document.activeElement;

    if (autoFocus) {
      const first = node.querySelector(FOCUSABLE);
      // Fall back to the container so focus at least enters the dialog.
      (first ?? node).focus?.();
    }

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!node.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => {
      node.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active, autoFocus]);

  return containerRef;
}
