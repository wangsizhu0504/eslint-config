import { defineConfig } from '../utils'
import { resolverExtensions } from '../constants'
import bestPracticeRules from './rules/best-practice'
import eslintComments from './rules/eslint-comments'
import unicornRules from './rules/unicorn'
import importRules from './rules/import'

const ignorePatterns = [
  '*.min.*',
  '*.d.ts',
  'CHANGELOG.md',
  'dist',
  'LICENSE*',
  'output',
  'out',
  'coverage',
  'public',
  'temp',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  '__snapshots__',
  // ignore for in lint-staged
  '*.css',
  '*.png',
  '*.ico',
  '*.toml',
  '*.patch',
  '*.txt',
  '*.crt',
  '*.key',
  'Dockerfile',
  // force include
  '!.github',
  '!.vitepress',
  '!.vscode',
  // force exclude
  '**/.vitepress/cache',
]

export default defineConfig({
  plugins: [
    '@kriszu',
    'html',
    'eslint-comments',
    'unicorn',
    'no-only-tests',
    'unused-imports',
  ],
  reportUnusedDisableDirectives: true,
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: resolverExtensions },
    },
  },
  ignorePatterns,
  rules: {
    // Common
    'semi': ['error', 'never'],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],

    'no-param-reassign': 'off',

    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'camelcase': 'off',
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-constant-condition': 'warn',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-cond-assign': ['error', 'always'],
    'func-call-spacing': 'off',
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    'no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-return-await': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-restricted-globals': [
      'error',
      { name: 'global', message: 'Use `globalThis` instead.' },
      { name: 'self', message: 'Use `globalThis` instead.' },
    ],
    'no-restricted-properties': [
      'error',
      { property: '__proto__', message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.' },
      { property: '__defineGetter__', message: 'Use `Object.defineProperty` instead.' },
      { property: '__defineSetter__', message: 'Use `Object.defineProperty` instead.' },
      { property: '__lookupGetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
      { property: '__lookupSetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
    ],

    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'operator-linebreak': ['error', 'before'],
    'no-use-before-define': ['error', {
      functions: false,
      classes: false,
      variables: true,
    }],

    // formatting
    'spaced-comment': ['error', 'always', {
      line: {
        markers: ['/'],
        exceptions: ['/', '#'],
      },
      block: {
        markers: ['!'],
        exceptions: ['*'],
        balanced: true,
      },
    }],
    // import
    ...importRules,

    // unicorns
    ...unicornRules,

    ...eslintComments,
    ...bestPracticeRules,

    // node
    'n/prefer-global/process': 'off',
    'n/prefer-global/buffer': ['error', 'never'],
    'n/no-callback-literal': 'off',
  },
})
