import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: [
        'defaults',
        'safari >= 7'
      ],
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime'
      ]
    })
  ],
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
          if (id.includes('src/constants/MarkdownFiles')) {
            // Split Markdown related pages into a separate chunk
            return 'mdfiles';
          }
          // Add more custom chunking logic as needed
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Increase the limit as needed
  },
});
