import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'portfolio-theme';

// Kept in sync with --bg-primary in src/index.css so mobile browser chrome
// matches the page.
const THEME_COLOR = { dark: '#111110', light: '#f5f0e8' };

// localStorage throws in some privacy modes and sandboxed iframes.
function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function resolveInitialTheme() {
  const stored = readStoredTheme();
  if (stored === 'dark' || stored === 'light') return stored;
  // Mirrors the inline script in index.html, which sets data-theme before
  // first paint to avoid a flash of the wrong theme.
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  // Follow the OS until the visitor makes an explicit choice. The stored value
  // is re-read inside the handler because toggling writes it after mount.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e) => {
      if (readStoredTheme()) return;
      setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Persisting happens here rather than in the effect above, so simply loading
  // the page never counts as an explicit choice.
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Persisting is best-effort; the session still works without it.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
