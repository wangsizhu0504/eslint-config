import config from 'eslint-config-standard/.eslintrc.json'

import type { TSESLint } from '@typescript-eslint/utils'

export const TSEquivalents = [
  'comma-spacing',
  'brace-style',
  'func-call-spacing',
  'keyword-spacing',
  'lines-between-class-members',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-redeclare',
  'no-unused-expressions',
  'no-useless-constructor',
  'quotes',
  'semi',
  'space-infix-ops',
  'object-curly-spacing',
] as const

export const VueEquivalents = [
  // Extension rules
  'array-bracket-spacing',
  'arrow-spacing',
  'block-spacing',
  'brace-style',
  'camelcase',
  'comma-dangle',
  'comma-spacing',
  'comma-style',
  'dot-location',
  'dot-notation',
  'eqeqeq',
  'func-call-spacing',
  'key-spacing',
  'keyword-spacing',
  'no-constant-condition',
  'no-empty-pattern',
  'no-extra-parens',
  'no-irregular-whitespace',
  'no-loss-of-precision',
  'no-sparse-arrays',
  'object-curly-newline',
  'object-curly-spacing',
  'object-property-newline',
  'object-shorthand',
  'operator-linebreak',
  'quote-props',
  'space-in-parens',
  'space-infix-ops',
  'space-unary-ops',
  'template-curly-spacing',
] as const

export const OffTSRules = [
  'naming-convention',
  'explicit-function-return-type',
  'explicit-member-accessibility',
  'no-explicit-any',
  'parameter-properties',
  'no-empty-interface',
  'ban-ts-ignore',
  'no-empty-function',
  'no-non-null-assertion',
  'explicit-module-boundary-types',
  'ban-types',
  'no-var-requires',
  'triple-slash-reference',
  'no-namespace',
  'consistent-indexed-object-style',
]
// Standard规则
export const configStandard = config as unknown as TSESLint.Linter.Config

// 需要解析的文件类型
export const resolverExtensions = ['.js', '.jsx', '.mjs', '.cjs', '.json']
// ts类型
export const resolverExtensionsWithTS = ['.ts', '.tsx', ...resolverExtensions]
