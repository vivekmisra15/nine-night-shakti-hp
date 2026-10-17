import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // './' makes every asset path relative, so the built dist/ folder works
  // wherever it is hosted (a sub-folder, a USB stick, or opened from disk).
  base: './',
});
