import { defineEslintConfig } from './packages/eslint-config/src'

export default defineEslintConfig(
  {
    formatters: true,
    jsx: {
      a11y: true,
    },
    markdown: {
      overrides: {
        'no-dupe-keys': 'off',
      },
    },
    nextjs: false,
    pnpm: true,
    react: true,
    stylistic: {
      semi: false,
    },
    typescript: {
      erasableOnly: true,
    },
    vue: {
      a11y: true,
    },
  },
  {
    ignores: [
      'fixtures',
      '_fixtures',
      '**/constants-generated.ts',
    ],
  },
  {
    rules: {
      'style/no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    },
  },
)
