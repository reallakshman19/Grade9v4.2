import { defineConfig, type Plugin } from 'vite';
import { fileURLToPath } from 'node:url';
import { existsSync, statSync, createReadStream } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const root = fileURLToPath(new URL('./web', import.meta.url));
const outDir = fileURLToPath(new URL('./dist', import.meta.url));
const publicDir = resolve(root, 'public');

const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

function servePublicStatic(): Plugin {
  return {
    name: 'serve-public-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        const url = new URL(req.url ?? '/', 'http://127.0.0.1');
        let pathname = decodeURIComponent(url.pathname);
        if (pathname.endsWith('/')) pathname += 'index.html';
        const candidate = join(publicDir, pathname.startsWith('/') ? pathname.slice(1) : pathname);
        if (existsSync(candidate) && statSync(candidate).isFile()) {
          const type = mime[extname(candidate)] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': type });
          if (req.method === 'HEAD') { res.end(); return; }
          createReadStream(candidate).pipe(res);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  root,
  base: './',
  appType: 'mpa',
  publicDir: 'public',
  plugins: [servePublicStatic()],
  build: {outDir, emptyOutDir: true, target: 'es2022', sourcemap: false},
  server: {port: 3000, strictPort: true, host: '127.0.0.1', fs: {strict: true}},
  preview: {port: 4173, strictPort: true, host: '127.0.0.1'},
});
