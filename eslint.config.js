// @ts-check
import kriszu from './packages/eslint-config/dist/index.js'

export default kriszu({
  ignores: [
    'packages/eslint-plugin/vendor',
  ],
  rules: {
    'kriszu/import-enforce-newlines': ['error', {
      items: 4,
    }],
  },
})
