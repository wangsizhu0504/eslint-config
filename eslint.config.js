import defineEslintConfig from './packages/eslint-config/dist/index.js'

export default defineEslintConfig(
  {
    vue: true,
    react: true,
    semi: true,
    typescript: true,
    ignores: [
      'packages/eslint-plugin/vendor',
    ],
    formatters: true,
  },
  {
    files: ['packages/eslint-config/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
  {
    rules: {
      'kriszu/no-import-dist': 'off',
      'ts/ban-types': 'off',
    },
  },
)
