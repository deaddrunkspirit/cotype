import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true,
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        manualChunks: {
          vendor: ['solid-js', 'highlight.js'],
        },
      },
    },
  },
  publicDir: 'public',
  base: '/cotype/',
})
