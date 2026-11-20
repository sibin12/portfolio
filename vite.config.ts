import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the build works on GitHub Pages under /testing/ (or any other repository name).
  base: './',
  build: {
    // Always ship the resume PDF as its own file, never inlined into the JavaScript.
    assetsInlineLimit: (file) => (file.endsWith('.pdf') ? false : undefined),
  },
});
