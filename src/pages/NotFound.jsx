import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="flex items-center justify-center px-6 flex-1">
      <div className="text-center">
        <p className="font-mono text-text-mono text-xs tracking-widest uppercase mb-6">
          404
        </p>
        <h1 className="text-text-primary text-3xl font-semibold mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="font-mono text-text-mono text-sm hover:text-accent transition-colors duration-150"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
