import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // generate a legacy bundle + inline polyfills for older WebKit/IE‑class browsers
    legacy({
      // list of browsers to support for the legacy build
      targets: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'ie 11'           // explicitly include IE11 (and very old WebKits)
      ],
      // optionally inject additional polyfills
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      /**
       * Ignore "use client" warning since we are not using SSR
       */
      onwarn(warning, warn) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes(`"use client"`)
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/constants/MarkdownFiles')) {
            return 'mdfiles';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
