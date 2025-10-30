import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: ['verbose'],
    name: 'unit',
    include: ['src/modules/**/use-cases/*.spec.ts'],
    environment: 'node',
  },
})
