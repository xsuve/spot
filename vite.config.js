import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'build'),
    sourcemap: 'inline'
  },
  plugins: [
    react(),
    crx({ manifest })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  }
});
