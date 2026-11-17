import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'web'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'web/index.html')
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1'
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: '127.0.0.1'
  }
});
