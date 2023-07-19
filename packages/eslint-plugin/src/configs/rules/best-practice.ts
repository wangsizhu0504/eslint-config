import { defineRules } from '../../utils'

export default defineRules({
  // best-practice
  'array-callback-return': 'error',
  'block-scoped-var': 'error',
  'consistent-return': 'off',
  'complexity': 'off',
  'eqeqeq': ['error', 'smart'],
  'no-alert': 'warn',
  'no-case-declarations': 'error',
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-with': 'error',
  'no-void': 'error',
  'no-useless-escape': 'off',
  'no-invalid-this': 'error',
  'vars-on-top': 'error',
  'require-await': 'off',
  'no-return-assign': 'off',
  'operator-linebreak': ['error', 'before'],
  'max-statements-per-line': ['error', { max: 1 }],
})
