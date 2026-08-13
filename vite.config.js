import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync } from 'node:fs';

// GitHub Pages serves 404.html for any path it cannot resolve. Shipping a copy
// of the built index.html under that name means a deep link or a refresh boots
// the SPA instead of GitHub's own 404 page, so src/pages/NotFound.jsx is
// actually reachable in production.
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const index = fileURLToPath(new URL('./dist/index.html', import.meta.url));
      const fallback = fileURLToPath(new URL('./dist/404.html', import.meta.url));
      if (existsSync(index)) {
        copyFileSync(index, fallback);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the long-lived dependencies out of the app chunk so a copy
        // tweak doesn't invalidate the whole bundle in visitors' caches.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
