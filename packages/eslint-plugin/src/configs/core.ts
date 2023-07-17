import { defineConfig } from '../utils'
import bestPracticeRules from './rules/best-practice'
import eslintComments from './rules/eslint-comments'

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
  '.vitepress/cache',
]

export default defineConfig({
  plugins: ['@kriszu', 'html', 'eslint-comments'],
  extends: ['standard'],
  ignorePatterns,
  rules: {
    // Common
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'quote-props': ['error', 'consistent-as-needed'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-return-await': 'error',
    'operator-linebreak': ['error', 'before'],
    'space-before-function-paren': ['error', 'never'],
    'no-use-before-define': ['error', {
      functions: false,
      classes: false,
      variables: true,
    }],
    'no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ],

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
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    ...eslintComments,
    ...bestPracticeRules,
  },
})
