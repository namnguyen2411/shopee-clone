import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  test: {
    environment: 'jsdom'
  }
})
