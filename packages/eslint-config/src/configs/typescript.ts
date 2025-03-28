import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsProjectType,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
  TypedFlatConfigItem,
} from '../types'

import process from 'node:process'
import { GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from '../globs'

import { pluginKriszu } from '../plugins'

import { interopDefault, renameRules } from '../utils'

export async function typescript(
  options: OptionsFiles & OptionsComponentExts & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions & OptionsProjectType = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    componentExts = [],
    overrides = {},
    overridesTypeAware = {},
    parserOptions = {},
    type = 'app',
  } = options ?? {}

  const files = options.files ?? [
    GLOB_TS,
    GLOB_TSX,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]
  const ignoresTypeAware = options.ignoresTypeAware ?? [
    `${GLOB_MARKDOWN}/**`,
  ]
  const tsconfigPath = options?.tsconfigPath
    ? options.tsconfigPath
    : undefined
  const isTypeAware = !!tsconfigPath

  const typeAwareRules: TypedFlatConfigItem['rules'] = {
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'ts/await-thenable': 'error',
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': 'error',
    'ts/no-for-in-array': 'error',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-promises': 'error',
    'ts/no-unnecessary-type-assertion': 'error',
    'ts/no-unsafe-argument': 'error',
    'ts/no-unsafe-assignment': 'error',
    'ts/no-unsafe-call': 'error',
    'ts/no-unsafe-member-access': 'error',
    'ts/no-unsafe-return': 'error',
    'ts/promise-function-async': 'error',
    'ts/restrict-plus-operands': 'error',
    'ts/restrict-template-expressions': 'error',
    'ts/return-await': ['error', 'in-try-catch'],
    'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
    'ts/switch-exhaustiveness-check': 'error',
    'ts/unbound-method': 'error',
  }
  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  function makeParser(typeAware: boolean, fileLists: string[], ignores?: string[]): TypedFlatConfigItem {
    return {
      name: `kriszu/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
      files: fileLists,
      ...ignores ? { ignores } : {},
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...(typeAware
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...parserOptions as any,
        },
      },
    }
  }
  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'kriszu/typescript/setup',
      plugins: {
        kriszu: pluginKriszu,
        ts: pluginTs as any,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...isTypeAware
      ? [
          makeParser(false, files),
          makeParser(true, filesTypeAware, ignoresTypeAware),
        ]
      : [makeParser(false, files)],
    {
      name: 'kriszu/typescript/rules',
      files,
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),

        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': false,
            'ts-ignore': 'allow-with-description',
          },
        ],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        }],

        'ts/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-require-imports': 'error',
        'ts/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/no-wrapper-object-types': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

        ...(type === 'lib'
          ? {
              'ts/explicit-function-return-type': ['error', {
                allowExpressions: true,
                allowHigherOrderFunctions: true,
                allowIIFEs: true,
              }],
            }
          : {}
        ),

        // custom
        'no-array-constructor': 'off',
        'no-empty-function': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-magic-numbers': ['off'],
        'no-restricted-imports': 'off',
        'no-return-await': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'ts/adjacent-overload-signatures': ['error'],
        'ts/array-type': ['error', { default: 'array-simple' }],
        'ts/ban-tslint-comment': ['error'],
        'ts/class-literal-property-style': ['error', 'getters'],
        'ts/consistent-generic-constructors': [
          'error',
          'constructor',
        ],
        'ts/consistent-indexed-object-style': 'off',
        'ts/consistent-type-assertions': 'off',
        'ts/default-param-last': ['error'],
        'ts/explicit-member-accessibility': ['off'],
        'ts/member-ordering': ['error'],
        'ts/naming-convention': [
          'warn',
          { format: ['PascalCase', 'camelCase'], selector: 'function' },
        ],
        'ts/no-array-constructor': ['error'],
        'ts/no-duplicate-enum-values': ['error'],
        'ts/no-empty-function': [
          'error',
          { allow: ['arrowFunctions', 'functions', 'methods'] },
        ],
        'ts/no-empty-interface': ['error', { allowSingleExtends: true }],
        'ts/no-extra-non-null-assertion': ['error'],
        'ts/no-inferrable-types': [
          'error',
          { ignoreParameters: false, ignoreProperties: false },
        ],
        'ts/no-invalid-this': 'off',
        'ts/no-loop-func': ['error'],
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
        'ts/no-redundant-type-constituents': ['off'],
        'ts/no-shadow': ['warn'],
        'ts/no-this-alias': ['error', { allowDestructuring: true }],
        'ts/no-unnecessary-condition': ['off'],
        'ts/no-unnecessary-type-constraint': ['error'],
        'ts/no-useless-empty-export': ['error'],
        'ts/no-var-requires': ['error'],
        'ts/parameter-properties': 'off',
        'ts/prefer-as-const': ['error'],
        'ts/prefer-for-of': ['error'],
        'ts/prefer-function-type': ['error'],
        'ts/prefer-literal-enum-member': ['error'],
        'ts/prefer-namespace-keyword': ['error'],
        'ts/require-await': ['off'],
        'ts/strict-boolean-expressions': ['off'],
        'ts/typedef': ['off'],

        ...overrides,
      },
    },
    ...isTypeAware
      ? [{
          name: 'kriszu/typescript/rules-type-aware',
          files: filesTypeAware,
          ignores: ignoresTypeAware,
          rules: {
            ...typeAwareRules,
            ...overridesTypeAware,
          },
        }]
      : [],
  ]
}
