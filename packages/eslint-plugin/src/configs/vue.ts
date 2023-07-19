import { getPackageInfoSync, isPackageExists } from 'local-pkg'
import { VueEquivalents } from '../constants'
import { defineConfig, fromEntries, ruleFromStandard } from '../utils'
import vue3Rules from './rules/eslint-vue3'

function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (
    pkg
    && typeof pkg.version === 'string'
    && !Number.isNaN(+pkg.version[0])
  )
    return +pkg.version[0]

  return 3
}
const TS = isPackageExists('typescript')

if (!TS)
  console.warn('[@kriszu/eslint-config] TypeScript is not installed, fallback to JS only.')
else
  console.log('[@kriszu/eslint-config] TypeScript is installed, use TS rules.')
const isVue3 = getVueVersion() === 3

export default defineConfig({
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        isVue3 ? 'plugin:vue/vue3-recommended' : 'plugin:vue/recommended',
        isVue3 ? 'plugin:vue/vue3-essential' : 'plugin:vue/essential',
        isVue3 ? 'plugin:vue/vue3-strongly-recommended' : 'plugin:vue/strongly-recommended',
      ],
      env: {
        'vue/setup-compiler-macros': true,
      },
      rules: {
        'indent': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1 }],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        ...(TS
          ? { '@typescript-eslint/no-unused-vars': 'off' }
          : null),

        // vue versions of Standard.js rules:
        ...fromEntries(VueEquivalents.map(name => [`vue/${name}`, ruleFromStandard(name)])),

        // Override custom JS rules
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
        'vue/camelcase': 'off',
        'vue/comma-dangle': ['error', 'always-multiline'],

        // Overrides
        'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
        // 'vue/html-self-closing': 'off',
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/block-tag-newline': ['error', {
          singleline: 'always',
          multiline: 'always',
        }],

        // Uncategorized rules
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/html-comment-content-spacing': ['error', 'always', {
          exceptions: ['-'],
        }],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-text-v-html-on-component': 'error',
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/prefer-separate-static-class': 'error',
        ...(isVue3 ? vue3Rules : {}),
      },
    },
  ],
  extends: [
    TS
      ? 'plugin:@kriszu/typescript'
      : 'plugin:@kriszu/core',
  ],
})
