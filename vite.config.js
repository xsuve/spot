import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import createManifest from './utils/plugins/createManifest';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'build'),
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        content_scripts: resolve(__dirname, 'src', 'extension', 'content_scripts', 'index.tsx'),
        background: resolve(__dirname, 'src', 'extension', 'background', 'index.ts'),
        options: resolve(__dirname, 'src', 'extension', 'options', 'index.html'),
        popup: resolve(__dirname, 'src', 'extension', 'popup', 'index.html')
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    react({
      include: '**/*.{js,jsx,ts,tsx}'
    }),
    createManifest()
  ]
});
