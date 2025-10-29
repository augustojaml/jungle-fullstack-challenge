import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  dts: true, // <-- Gera dist/index.d.ts
  sourcemap: true, // opcional
  clean: true,
  target: 'node20',
  treeshake: false, // evita poda agressiva (é só tipos)
  minify: false,
})
