/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command: buildCommand }) => {
  const devServerIsRunning = buildCommand === 'serve'

  return {
    plugins: [react()],
    build: {
      sourcemap: devServerIsRunning,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts'
    },
  }
})
