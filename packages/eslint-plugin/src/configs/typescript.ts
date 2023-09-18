import { join } from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
import { defineConfig, defineRules, fromEntries, ruleFromStandard } from '../utils'
import { OffTSRules, TSEquivalents, resolverExtensionsWithTS } from '../constants'

const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'

const existTsconfig = fs.existsSync(join(process.cwd(), tsconfig))
const TsconfigRules = defineRules({
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
  'no-void': ['error', { allowAsStatement: true }],
})

const typescriptRule = defineRules({
  // Rules replaced by @typescript-eslint versions:
  ...fromEntries(TSEquivalents.map(name => [name, 'off'])),
  // @typescript-eslint versions of Standard.js rules:
  ...fromEntries(TSEquivalents.map(name => [`@typescript-eslint/${name}`, ruleFromStandard(name)])),
  // Override custom JS rules
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
})
export default defineConfig({
  extends: [
    'plugin:@kriszu/esnext',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/extensions': resolverExtensionsWithTS,
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: resolverExtensionsWithTS,
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['*.js', '*.cjs', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      excludedFiles: ['**/*.md/*.*'],
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      extends: [existTsconfig ? 'plugin:@kriszu/typescriptTypeChecking' : ''],
      rules: existTsconfig ? TsconfigRules : typescriptRule,
    },
    {
      files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
        'no-only-tests/no-only-tests': 'error',
      },
    },
    {
      files: ['tsconfig.json', 'tsconfig.*.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
            ],
          },
          {
            pathPattern: '^compilerOptions$',
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'lib',
              'jsx',
              'experimentalDecorators',
              'emitDecoratorMetadata',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'reactNamespace',
              'noLib',
              'useDefineForClassFields',
              'moduleDetection',
              /* Modules */
              'module',
              'rootDir',
              'moduleResolution',
              'baseUrl',
              'paths',
              'rootDirs',
              'typeRoots',
              'types',
              'allowUmdGlobalAccess',
              'moduleSuffixes',
              'allowImportingTsExtensions',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'customConditions',
              'resolveJsonModule',
              'allowArbitraryExtensions',
              'noResolve',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Emit */
              'declaration',
              'declarationMap',
              'emitDeclarationOnly',
              'sourceMap',
              'inlineSourceMap',
              'outFile',
              'outDir',
              'removeComments',
              'noEmit',
              'importHelpers',
              'importsNotUsedAsValues',
              'downlevelIteration',
              'sourceRoot',
              'mapRoot',
              'inlineSources',
              'emitBOM',
              'newLine',
              'stripInternal',
              'noEmitHelpers',
              'noEmitOnError',
              'preserveConstEnums',
              'declarationDir',
              'preserveValueImports',
              /* Interop Constraints */
              'isolatedModules',
              'verbatimModuleSyntax',
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'preserveSymlinks',
              'forceConsistentCasingInFileNames',
              /* Type Checking */
              'strict',
              'noImplicitAny',
              'strictNullChecks',
              'strictFunctionTypes',
              'strictBindCallApply',
              'strictPropertyInitialization',
              'noImplicitThis',
              'useUnknownInCatchVariables',
              'alwaysStrict',
              'noUnusedLocals',
              'noUnusedParameters',
              'exactOptionalPropertyTypes',
              'noImplicitReturns',
              'noFallthroughCasesInSwitch',
              'noUncheckedIndexedAccess',
              'noImplicitOverride',
              'noPropertyAccessFromIndexSignature',
              'allowUnusedLabels',
              'allowUnreachableCode',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
          },
        ],
      },
    },
  ],
  rules: {
    'import/named': 'off',

    // TS
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/ban-ts-comment': ['error',
      {
        'ts-expect-error': false,
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'comma', requireLast: false },
      },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Override JS
    // 'indent': 'off',
    // '@typescript-eslint/indent': ['error', 2, {
    //   SwitchCase: 1,
    //   VariableDeclarator: 1,
    //   outerIIFEBody: 1,
    //   MemberExpression: 1,
    //   FunctionDeclaration: { parameters: 1, body: 1 },
    //   FunctionExpression: { parameters: 1, body: 1 },
    //   CallExpression: { arguments: 1 },
    //   ArrayExpression: 1,
    //   ObjectExpression: 1,
    //   ImportDeclaration: 1,
    //   flatTernaryExpressions: false,
    //   ignoreComments: false,
    //   ignoredNodes: [
    //     'TemplateLiteral *',
    //     'JSXElement',
    //     'JSXElement > *',
    //     'JSXAttribute',
    //     'JSXIdentifier',
    //     'JSXNamespacedName',
    //     'JSXMemberExpression',
    //     'JSXSpreadAttribute',
    //     'JSXExpressionContainer',
    //     'JSXOpeningElement',
    //     'JSXClosingElement',
    //     'JSXFragment',
    //     'JSXOpeningFragment',
    //     'JSXClosingFragment',
    //     'JSXText',
    //     'JSXEmptyExpression',
    //     'JSXSpreadChild',
    //     'TSTypeParameterInstantiation',
    //     'FunctionExpression > .params[decorators.length > 0]',
    //     'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
    //     'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
    //   ],
    //   offsetTernaryExpressions: true,
    // }],
    'no-use-before-define': 'off',
    // 不在定义前使用函数
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
      classes: false,
      enums: false,
      variables: true,
      typedefs: false, // Only the TypeScript rule has this option.
    }],

    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': ['error', 'always'],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error', 'functions'],
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    // off
    ...fromEntries(OffTSRules.map(name => [`@typescript-eslint/${name}`, 'off'])),
  },
})
