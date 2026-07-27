import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'portfolio-2026' with your repository name for GitHub Pages deployment
  base: '/portfolio-2026/',
});
