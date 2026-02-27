import fs from 'node:fs/promises'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  format: ['esm'],
  shims: true,
  hooks: {
    'build:done': async () => {
      await fs.copyFile('../../README.md', 'dist/README.md')
    },
  },
})
