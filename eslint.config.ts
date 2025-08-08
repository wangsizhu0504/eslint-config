import { defineEslintConfig } from './packages/eslint-config/src'

export default defineEslintConfig(
  {
    vue: {
      a11y: true,
    },
    react: true,
    nextjs: true,
    typescript: true,
    formatters: true,
    pnpm: true,
    type:"lib",
    jsx: {
      a11y: true,
    },
    stylistic: {
      semi: false,
    },
  },
  {
    ignores: [
      'fixtures',
      '_fixtures',
      'packages/eslint-plugin/vendor',
    ],
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  }
)
