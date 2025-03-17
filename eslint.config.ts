import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { defineEslintConfig } from './packages/eslint-config/src'

export default defineEslintConfig(
  {
    vue: true,
    react: true,
    typescript: true,
    formatters: true,
    pnpm: true,
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
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
)
