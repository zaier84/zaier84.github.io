import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { CommandPalette } from './CommandPalette';
import { useLenis } from '@/lib/useLenis';

export function Layout({ children }) {
  useLenis();

  return (
    <div className="relative bg-bg-primary text-text-primary min-h-screen flex flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-bg-elevated focus:border focus:border-border-strong focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      {/* tabIndex makes <main> a valid focus target so "Skip to content"
          actually moves the keyboard caret, not just the scroll position. */}
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer />

      <CommandPalette />
    </div>
  );
}
