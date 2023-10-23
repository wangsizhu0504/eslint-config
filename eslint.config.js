// @ts-check
import kriszu from './packages/eslint-config/dist/index.js'

export default kriszu({
  ignores: [
    'fixtures',
    '_fixtures',
    'packages/eslint-plugin/vendor',
  ],
})
