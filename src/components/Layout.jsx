import { Masthead } from './Masthead';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ground text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:border focus:border-rule-strong focus:bg-raised focus:px-4 focus:py-2 focus:font-data focus:text-xs"
      >
        Skip to content
      </a>

      <Masthead />

      {/* tabIndex makes <main> a valid focus target, so the skip link moves the
          keyboard caret and not just the scroll position. */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer />
    </div>
  );
}
