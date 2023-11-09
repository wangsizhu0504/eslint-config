import process from 'node:process'
import { paddingLines } from 'src/lib/paddingLines'
import { GLOB_DTS, GLOB_SRC } from '../globs'
import { parserTs, pluginImport, pluginKriszu, pluginTs } from '../plugins'
import { renameRules, toArray } from '../utils'
import type {
  ConfigItem,
  OptionsComponentExts,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from '../types'

export function typescript(
  options?: OptionsComponentExts & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions,
): ConfigItem[] {
  const {
    componentExts = [],
    overrides = {},
    parserOptions = {},
  } = options ?? {}

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined

  const typeAwareRules: ConfigItem['rules'] = {
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'no-throw-literal': 'off',
    'ts/await-thenable': 'error',
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': ['error', { ignoreIIFE: true, ignoreVoid: true }],
    'ts/no-for-in-array': 'error',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-promises': 'error',
    'ts/no-throw-literal': 'error',
    'ts/no-unnecessary-type-assertion': 'error',
    'ts/no-unsafe-argument': 'error',
    'ts/no-unsafe-assignment': 'warn',
    'ts/no-unsafe-call': 'warn',
    'ts/no-unsafe-member-access': 'error',
    'ts/no-unsafe-return': 'error',
    'ts/restrict-plus-operands': 'error',
    'ts/restrict-template-expressions': 'error',
    'ts/unbound-method': 'error',
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'kriszu:typescript:setup',
      plugins: {
        import: pluginImport,
        kriszu: pluginKriszu,
        ts: pluginTs as any,
      },
    },
    {
      files: [
        GLOB_SRC,
        ...componentExts.map(ext => `**/*.${ext}`),
      ],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...(tsconfigPath
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...parserOptions as any,
        },
      },
      name: 'kriszu:typescript:rules',
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          '@typescript-eslint/',
          'ts/',
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          '@typescript-eslint/',
          'ts/',
        ),

        'default-param-last': 'off',
        'kriszu/generic-spacing': 'error',
        'kriszu/named-tuple-spacing': 'error',

        'kriszu/no-cjs-exports': 'error',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',

        'no-empty-function': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-magic-numbers': ['off'],
        'no-redeclare': 'off',
        'no-restricted-imports': 'off',
        'no-return-await': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',

        'no-useless-constructor': 'off',
        'ts/adjacent-overload-signatures': ['error'],
        'ts/array-type': ['error', { default: 'array-simple' }],

        'ts/ban-ts-comment': ['error', {
          'ts-expect-error': false,
          'ts-ignore': 'allow-with-description',
        }],
        'ts/ban-tslint-comment': ['error'],
        'ts/ban-types': ['error', {
          extendDefaults: false,
          types: {
            '[[[[[]]]]]': '🦄💥',
            '[[[[]]]]': 'ur drunk 🤡',
            '[[[]]]': 'Don\'t use `[[[]]]`. Use `SomeType[][][]` instead.',
            '[[]]': 'Don\'t use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.',
            '[]': 'Don\'t use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.',
            '{}': {
              fixWith: 'Record<string, unknown>',
              message: 'The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.',
            },
            'BigInt': {
              fixWith: 'bigint',
              message: 'Use `bigint` instead.',
            },
            'Boolean': {
              fixWith: 'boolean',
              message: 'Use `boolean` instead.',
            },
            'Function': 'Use a specific function type instead, like `() => void`.',
            'Number': {
              fixWith: 'number',
              message: 'Use `number` instead.',
            },
            'object': {
              fixWith: 'Record<string, unknown>',
              message: 'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
            },
            'Object': {
              fixWith: 'Record<string, unknown>',
              message: 'The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848',
            },
            'String': {
              fixWith: 'string',
              message: 'Use `string` instead.',
            },
            'Symbol': {
              fixWith: 'symbol',
              message: 'Use `symbol` instead.',
            },
          },
        }],
        'ts/brace-style': [
          'off',
          '1tbs',
          { allowSingleLine: false },
        ],
        'ts/class-literal-property-style': ['error', 'getters'],
        'ts/comma-dangle': ['error', 'always-multiline'],
        'ts/comma-spacing': [
          'error',
          { after: true, before: false },
        ],
        'ts/consistent-generic-constructors': [
          'error',
          'constructor',
        ],
        'ts/consistent-indexed-object-style': [
          'error',
          'index-signature',
        ],
        'ts/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
          },
        ],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        'ts/default-param-last': ['error'],
        'ts/explicit-function-return-type': ['off'],
        'ts/explicit-member-accessibility': ['off'],
        'ts/func-call-spacing': ['off', 'never'],
        'ts/indent': [
          'off',
          'tab',
          {
            flatTernaryExpressions: false,
            ignoreComments: false,
            offsetTernaryExpressions: false,
            SwitchCase: 1,
          },
        ],
        'ts/keyword-spacing': [
          'off',
          { after: true, before: true, overrides: {} },
        ],
        'ts/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        'ts/member-delimiter-style': [
          'off',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        'ts/member-ordering': ['error'],
        'ts/naming-convention': [
          'warn',
          { format: ['PascalCase', 'camelCase'], selector: 'function' },
        ],
        'ts/no-array-constructor': ['error'],
        'ts/no-dupe-class-members': ['error'],
        'ts/no-duplicate-enum-values': ['error'],
        'ts/no-dynamic-delete': ['error'],
        'ts/no-empty-function': [
          'error',
          { allow: ['arrowFunctions', 'functions', 'methods'] },
        ],
        'ts/no-empty-interface': [
          'error',
          { allowSingleExtends: true },
        ],
        'ts/no-explicit-any': ['off'],
        'ts/no-extra-non-null-assertion': ['error'],
        'ts/no-extra-parens': [
          'off',
          'all',
          {
            conditionalAssign: true,
            enforceForArrowConditionals: false,
            ignoreJSX: 'all',
            nestedBinaryExpressions: false,
            returnAssign: false,
          },
        ],
        'ts/no-extra-semi': ['off'],
        'ts/no-extraneous-class': 'off',

        'ts/no-import-type-side-effects': 'error',
        'ts/no-inferrable-types': [
          'error',
          { ignoreParameters: false, ignoreProperties: false },
        ],
        'ts/no-invalid-this': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-loop-func': ['error'],
        'ts/no-loss-of-precision': 'error',
        'ts/no-magic-numbers': [
          'off',
          {
            detectObjects: false,
            enforceConst: true,
            ignore: [],
            ignoreArrayIndexes: true,
          },
        ],
        'ts/no-misused-new': ['error'],
        'ts/no-namespace': [
          'error',
          { allowDeclarations: false, allowDefinitionFiles: false },
        ],
        'ts/no-non-null-asserted-nullish-coalescing': ['error'],
        'ts/no-non-null-asserted-optional-chain': ['error'],

        'ts/no-non-null-assertion': 'off',

        'ts/no-redeclare': 'error',
        'ts/no-redundant-type-constituents': ['off'],
        'ts/no-require-imports': 'error',
        'ts/no-shadow': ['warn'],
        'ts/no-this-alias': ['error', { allowDestructuring: true }],
        'ts/no-unnecessary-condition': ['off'],
        'ts/no-unnecessary-type-constraint': ['error'],
        'ts/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: false,
            enforceForJSX: false,
          },
        ],
        'ts/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        'ts/no-use-before-define': [
          'error',
          { classes: true, functions: true, variables: true },
        ],
        'ts/no-useless-constructor': 'off',
        'ts/no-useless-empty-export': ['error'],
        'ts/no-var-requires': ['error'],
        'ts/object-curly-spacing': ['off', 'never'],
        'ts/padding-line-between-statements': [
          'error',
          ...paddingLines,
        ],
        'ts/parameter-properties': [
          'error',
          { prefer: 'parameter-property' },
        ],
        'ts/prefer-as-const': ['error'],
        'ts/prefer-for-of': ['error'],
        'ts/prefer-function-type': ['error'],
        'ts/prefer-literal-enum-member': ['error'],
        'ts/prefer-namespace-keyword': ['error'],
        'ts/prefer-ts-expect-error': 'error',
        'ts/quotes': ['off', 'single'],
        'ts/require-await': ['off'],
        'ts/semi': ['off', 'always'],
        'ts/space-before-blocks': ['off', 'always'],
        'ts/space-before-function-paren': [
          'off',
          { anonymous: 'always', asyncArrow: 'always', named: 'never' },
        ],
        'ts/space-infix-ops': ['off'],
        'ts/strict-boolean-expressions': ['off'],
        'ts/triple-slash-reference': 'off',
        'ts/type-annotation-spacing': ['off'],
        'ts/typedef': ['off'],
        'ts/unified-signatures': [
          'error',
          { ignoreDifferentlyNamedParameters: true },
        ],

        ...tsconfigPath ? typeAwareRules : {},
        ...overrides,
      },
    },
    {
      files: [GLOB_DTS],
      name: 'kriszu:typescript:dts-overrides',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'kriszu:typescript:tests-overrides',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'kriszu:typescript:javascript-overrides',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
  ]
}
