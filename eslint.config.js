// @ts-check
import kriszu from './packages/eslint-config/dist/index.js'

export default kriszu(
  {
    ignores: [
      'packages/eslint-plugin/vendor',
    ],
  },
  {
    files: ['packages/eslint-config/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
