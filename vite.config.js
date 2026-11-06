import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(process.cwd(), 'app.html')
    }
  }
});

