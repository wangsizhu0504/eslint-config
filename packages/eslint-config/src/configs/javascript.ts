import type { OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from '../types'

import globals from 'globals'

export async function javascript(
  options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    isInEditor = false,
    overrides = {},
  } = options

  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: 'kriszu/javascript/setup',
    },
    {
      name: 'kriszu/javascript/rules',
      rules: {
        'accessor-pairs': [
          'error',
          { enforceForClassMembers: true, setWithoutGet: true },
        ],
        // Common
        'array-bracket-newline': 'off',
        // best-practice
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'complexity': ['off', 11],
        'consistent-return': 'off',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'eqeqeq': ['warn', 'smart'],
        'function-call-argument-newline': 'off',
        'function-paren-newline': 'off',
        'generator-star': 'off',
        'implicit-arrow-linebreak': 'off',
        'indent': 'off',
        'indent-legacy': 'off',
        'jsx-quotes': 'off',
        'linebreak-style': 'off',
        'new-cap': [
          'error',
          { capIsNew: false, newIsCap: true, properties: true },
        ],
        'newline-per-chained-call': 'off',

        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-arrow-condition': 'off',
        'no-async-promise-executor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-comma-dangle': 'off',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-confusing-arrow': 'off',
        'no-console': 'off',
        'no-const-assign': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-semi': 'off',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-invalid-this': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-regex-spaces': 'error',
        'no-reserved-keys': 'off',
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
          { message: 'Use `Number.isNaN` instead', name: 'isNaN' },
          { message: 'Use `Number.isFinite` instead', name: 'isFinite' },
          { message: 'Use `Number.parseFloat` instead', name: 'parseFloat' },
          { message: 'Use `Number.parseInt` instead', name: 'parseInt' },
        ],
        'no-restricted-properties': [
          'error',
          {
            message: 'Use `Number.isNaN` instead',
            object: 'globalThis',
            property: 'isNaN',
          },
          {
            message: 'Use `Number.isFinite` instead',
            object: 'globalThis',
            property: 'isFinite',
          },
          {
            message: 'Use `Number.parseFloat` instead',
            object: 'globalThis',
            property: 'parseFloat',
          },
          {
            message: 'Use `Number.parseInt` instead',
            object: 'globalThis',
            property: 'parseInt',
          },
          {
            message: 'Use `Number.isNaN` instead',
            object: 'window',
            property: 'isNaN',
          },
          {
            message: 'Use `Number.isFinite` instead',
            object: 'window',
            property: 'isFinite',
          },
          {
            message: 'Use `Number.parseFloat` instead',
            object: 'window',
            property: 'parseFloat',
          },
          {
            message: 'Use `Number.parseInt` instead',
            object: 'window',
            property: 'parseInt',
          },
        ],
        'no-restricted-syntax': [
          'error',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],

        'no-return-await': 'off',
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow-restricted-names': 'error',
        'no-space-before-semi': 'off',
        'no-spaced-func': 'off',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'no-unused-vars': [
          'error',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],
        'no-use-before-define': [
          'error',
          { classes: false, functions: false, variables: true },
        ],
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-with': 'error',
        'no-wrap-func': 'off',
        'nonblock-statement-body-position': 'off',

        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],

        'one-var': ['error', { initialized: 'never' }],
        'one-var-declaration-per-line': 'off',
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          isInEditor ? 'warn' : 'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',

        'prefer-template': 'error',
        'require-await': 'off',
        'spaced-comment': [
          'error',
          'always',
          {
            block: {
              balanced: true,
              exceptions: ['*'],
              markers: ['!'],
            },
            line: {
              exceptions: ['/', '#'],
              markers: ['/'],
            },
          },
        ],
        'switch-colon-spacing': 'off',
        'symbol-description': 'off',
        'unicode-bom': ['error', 'never'],
        'use-isnan': [
          'error',
          { enforceForIndexOf: true, enforceForSwitchCase: true },
        ],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        'wrap-regex': 'off',
        'yoda': ['error', 'never'],

        ...overrides,
      },
    },
  ]
}
