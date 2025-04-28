import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      renderModernChunks: false,

      targets: [
        'last 2 Safari versions', 
        'iOS >= 10',
        'chrome >= 49',
        'not dead'
      ],

      // add fetch, promise, regenerator, etc.
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime', 
        'whatwg-fetch',
        'core-js/features/promise',
        'core-js/features/array/find',
        'core-js/features/object/assign',
        // …add any other core-js polyfills you discover you need
      ],
      externalSystemJS: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes(`"use client"`)
        ) {
          return
        }
        warn(warning)
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('src/constants/MarkdownFiles')) return 'mdfiles'
        }
      }
    }
  }
})