import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./web', import.meta.url));
const outDir = fileURLToPath(new URL('./dist', import.meta.url));

export default defineConfig({
  root,
  base: './',
  appType: 'mpa',
  publicDir: false,
  build: {outDir, emptyOutDir: true, target: 'es2022', sourcemap: false},
  server: {port: 3000, strictPort: true, host: '127.0.0.1', fs: {strict: true}},
  preview: {port: 4173, strictPort: true, host: '127.0.0.1'},
});
