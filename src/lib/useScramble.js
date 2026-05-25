import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';

/**
 * Text "decode" effect — characters resolve out of random glyphs, left to right.
 *
 * Returns `[display, start]`. Attach `display` as element text and call `start()`
 * to (re)play. Under reduced motion the target text resolves instantly.
 *
 * @param {string} text   Final resolved string.
 * @param {object} opts
 * @param {boolean} opts.auto   Play once on mount. Default true.
 * @param {number}  opts.speed  Chars resolved per frame-tick. Default 1.
 * @param {number}  opts.delay  Delay (ms) before auto-play. Default 0.
 */
export function useScramble(text, { auto = true, speed = 1, delay = 0 } = {}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : '');
  const frame = useRef(0);
  const raf = useRef(0);
  const timer = useRef(0);

  const start = useCallback(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const total = text.length;

    const tick = () => {
      const revealed = Math.floor(frame.current);
      let out = '';
      for (let i = 0; i < total; i++) {
        if (i < revealed) {
          out += text[i];
        } else if (text[i] === ' ') {
          out += ' ';
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      frame.current += speed;
      if (revealed < total) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, speed, reduce]);

  useEffect(() => {
    if (!auto) return undefined;
    timer.current = window.setTimeout(start, delay);
    return () => {
      window.clearTimeout(timer.current);
      cancelAnimationFrame(raf.current);
    };
  }, [auto, delay, start]);

  return [display, start];
}
