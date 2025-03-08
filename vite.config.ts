import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Allows using "@" as an alias for "src"
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
            // Split vendor code into separate chunks
            return 'vendor';
          }
          if (id.includes('src/constants/posts')) {
            // Split Posts related pages into a separate chunk
            return 'posts';
          }
          // Add more custom chunking logic as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit as needed
  },
});
