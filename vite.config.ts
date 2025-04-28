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
      // transpile everything down to IE11/ES5
      targets: ['>0.2%', 'not dead', 'ie 11'],
      // include core-js, regenerator, fetch and globalThis polyfills
      polyfills: true,
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'core-js/stable',
        'whatwg-fetch',
        'core-js/proposals/global-this',
        'core-js/features/promise',
        'core-js/features/array/find',
        'core-js/features/object/assign',
      ],
      // we don’t need modern polyfills in your case
      modernPolyfills: false,
      // make sure legacy chunks are emitted
      renderLegacyChunks: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // esbuild will down‑level everything to ES5 (incl. RegExp)
    target: 'es5',
    rollupOptions: {
      onwarn(warning, warn) {
        // suppress the "use client" warning
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
    },
    chunkSizeWarningLimit: 1500
  }
})