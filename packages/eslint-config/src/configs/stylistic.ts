import { paddingLines } from '../lib/paddingLines'
import { GLOB_REACT, GLOB_TS, GLOB_TSX } from '../globs'
import { pluginKriszu, pluginStylistic } from '../plugins'
import type { ConfigItem, StylisticConfig } from '../types'

export function stylistic(options: StylisticConfig = {}): ConfigItem[] {
  const {
    indent = 2,
    jsx = true,
    quotes = 'single',
  } = options

  return [
    {
      name: 'kriszu:stylistic',
      plugins: {
        kriszu: pluginKriszu,
        style: pluginStylistic,
      },
      rules: {
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'kriszu/consistent-list-newline': 'error',

        'kriszu/top-level-function': 'error',

        'style/array-bracket-spacing': ['error', 'never'],
        'style/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
        'style/arrow-spacing': ['error', { after: true, before: true }],
        'style/block-spacing': ['error', 'always'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'style/comma-dangle': ['error', 'always-multiline'],
        'style/comma-spacing': ['error', { after: true, before: false }],
        'style/comma-style': ['error', 'last'],
        'style/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
        'style/dot-location': ['error', 'property'],
        'style/eol-last': 'error',
        'style/indent': ['error', indent, {
          ArrayExpression: 1,
          CallExpression: { arguments: 1 },
          flatTernaryExpressions: false,
          FunctionDeclaration: { body: 1, parameters: 1 },
          FunctionExpression: { body: 1, parameters: 1 },
          ignoreComments: false,
          ignoredNodes: [
            'TemplateLiteral *',
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
            'TSTypeParameterInstantiation',
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
          ImportDeclaration: 1,
          MemberExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true,

          outerIIFEBody: 1,
          SwitchCase: 1,
          VariableDeclarator: 1,
        }],

        'style/key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'style/keyword-spacing': ['error', { after: true, before: true }],
        'style/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'style/max-statements-per-line': ['error', { max: 1 }],
        'style/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
        'style/multiline-ternary': ['error', 'always-multiline'],
        'style/new-parens': 'error',
        'style/no-extra-parens': ['error', 'all', {
          conditionalAssign: true,
          enforceForArrowConditionals: false,
          ignoreJSX: 'all',
          nestedBinaryExpressions: false,
          returnAssign: false,
        }],
        'style/no-floating-decimal': 'error',
        'style/no-mixed-operators': ['error', {
          allowSamePrecedence: true,
          groups: [
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
        }],
        'style/no-mixed-spaces-and-tabs': 'error',
        'style/no-multi-spaces': 'error',
        'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'style/no-tabs': indent === 'tab' ? 'off' : 'error',
        'style/no-trailing-spaces': 'error',
        'style/no-whitespace-before-property': 'error',
        'style/object-curly-spacing': ['error', 'always'],
        'style/operator-linebreak': ['error', 'before'],
        'style/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
        'style/quote-props': ['error', 'consistent-as-needed'],
        'style/quotes': ['error', quotes, { allowTemplateLiterals: true, avoidEscape: false }],
        'style/rest-spread-spacing': ['error', 'never'],
        'style/semi': ['error', 'never'],
        'style/semi-spacing': ['error', { after: true, before: false }],
        'style/space-before-blocks': ['error', 'always'],
        'style/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
        'style/space-in-parens': ['error', 'never'],
        'style/space-infix-ops': 'error',
        'style/space-unary-ops': ['error', { nonwords: false, words: true }],
        'style/spaced-comment': ['error', 'always', {
          block: {
            balanced: true,
            exceptions: ['*'],
            markers: ['!'],
          },
          line: {
            exceptions: ['/', '#'],
            markers: ['/'],
          },
        }],
        'style/template-curly-spacing': 'error',
        'style/template-tag-spacing': ['error', 'never'],
        'style/type-annotation-spacing': ['error', {}],
        'style/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
        'style/yield-star-spacing': ['error', 'both'],
      },
    },
    {
      files: [GLOB_REACT],
      rules: {
        ...jsx
          ? {
              'style/jsx-closing-bracket-location': 'error',
              'style/jsx-closing-tag-location': 'error',
              'style/jsx-curly-brace-presence': ['error', { propElementValues: 'always' }],
              'style/jsx-curly-newline': 'error',
              'style/jsx-curly-spacing': ['error', 'never'],
              'style/jsx-equals-spacing': 'error',
              'style/jsx-first-prop-new-line': 'error',
              'style/jsx-indent': ['warn', indent, { checkAttributes: true, indentLogicalExpressions: true }],
              'style/jsx-indent-props': ['warn', indent],

              'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
              'style/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
              'style/jsx-quotes': 'off',
              'style/jsx-tag-spacing': [
                'error',
                {
                  afterOpening: 'never',
                  beforeClosing: 'never',
                  beforeSelfClosing: 'always',
                  closingSlash: 'never',
                },
              ],
              'style/jsx-wrap-multilines': [
                'error',
                {
                  arrow: 'parens-new-line',
                  assignment: 'parens-new-line',
                  condition: 'parens-new-line',
                  declaration: 'parens-new-line',
                  logical: 'parens-new-line',
                  prop: 'parens-new-line',
                  return: 'parens-new-line',
                },
              ],
            }
          : {},
      },
    },
    {
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        // overwritten by typescript-eslint
        'style/padding-line-between-statements': [
          'error',
          ...paddingLines,
        ],
      },
    },
  ]
}
