const { isPackageExists, getPackageInfoSync } = require('local-pkg')

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

const isVue3 = getVueVersion() === 3

const vue3Rules = {
  'vue/prefer-import-from-vue': 'off',
  'vue/require-prop-types': 'off',
  // reactivity transform
  'vue/no-setup-props-destructure': 'off',
  'vue/define-macros-order': ['error', {
    order: ['defineProps', 'defineEmits'],
  }],

}
module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        ...(TS
          ? { '@typescript-eslint/no-unused-vars': 'off' }
          : null),
      },
    },
  ],
  extends: [
    isVue3 ? 'plugin:vue/vue3-recommended' : 'plugin:vue/recommended',
    isVue3 ? 'plugin:vue/vue3-essential' : 'plugin:vue/essential',
    isVue3 ? 'plugin:vue/vue3-strongly-recommended' : 'plugin:vue/strongly-recommended',
    TS ? './typescript' : './basic',
  ],
  rules: {
    'vue/block-tag-newline': ['error', {
      singleline: 'always',
      multiline: 'always',
    }],
    'vue/require-default-prop': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-prop-types': 'off',
    'vue/prefer-separate-static-class': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] },
    ],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/no-useless-v-bind': 'error',
    'vue/no-unused-refs': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],

    'vue/prefer-template': 'error',
    'vue/eqeqeq': ['error', 'smart'],
    'vue/no-constant-condition': 'warn',
    'vue/no-loss-of-precision': 'error',
    'vue/no-empty-pattern': 'error',

    'vue/component-options-name-casing': ['error', 'PascalCase'],
    // extensions
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'vue/comma-style': ['error', 'last'],
    'vue/dot-location': ['error', 'property'],
    'vue/dot-notation': ['error', { allowKeywords: true }],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    'vue/no-extra-parens': ['error', 'functions'],
    'vue/no-irregular-whitespace': 'error',
    'vue/no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'vue/no-sparse-arrays': 'error',
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    'vue/object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    'vue/operator-linebreak': ['error', 'before'],
    'vue/quote-props': ['error', 'consistent-as-needed'],
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    'vue/template-curly-spacing': 'error',
    ...(isVue3 ? vue3Rules : {}),
  },
}
