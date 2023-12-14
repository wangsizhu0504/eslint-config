import kriszu from './packages/eslint-config/dist/index.js'

export default kriszu(
  {
    vue: true,
    react: true,
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
      'ts/ban-types': 'off',
    },
  },
)
