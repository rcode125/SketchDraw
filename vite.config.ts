import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            rollupOptions: {
              output: {
                entryFileNames: 'index.js',
              },
            },
          },
        },
      },
      preload: {
        input: 'electron/preload/index.ts',
        vite: {
          build: {
            rollupOptions: {
              output: {
                entryFileNames: 'preload.js',
              },
            },
          },
        },
      },
      renderer: {},
    }),
  ],
})
