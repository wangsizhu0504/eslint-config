import type { OptionsIsInEditor, OptionsStylistic, TypedFlatConfigItem } from '../types'

import { pluginImport, pluginKriszu, pluginUnusedImports } from '../plugins'

export async function imports(
  options: OptionsIsInEditor & OptionsStylistic = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    isInEditor = false,
    stylistic = true,
  } = options
  return [
    {
      name: 'kriszu/imports/rules',
      plugins: {
        'import': pluginImport,
        'kriszu': pluginKriszu,
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'kriszu/import-dedupe': 'error',

        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

        // Hard to expect this when the grouped exports can't be enabled.
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
        'import/first': 'error',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
        'import/no-duplicates': 'error',

        // Forbid the use of extraneous packages
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
        'import/no-mutable-exports': 'error',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md
        'import/no-named-default': 'error',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
        'import/no-self-import': 'error',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md
        'import/no-webpack-loader-syntax': 'error',

        // dynamic imports require a leading comment with a webpackChunkName
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
        'import/export': 'error',

        // Helpful warnings:
        // disallow invalid exports, e.g. multiple defaults
        // In TS, if a type needs to be exported inline, it's dependent types should be right above it
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md
        'import/exports-last': 'off',

        // Re-exporting a type when the 'isolatedModules' flag is provided requires using 'export type'
        // https://githubis.com/benmosher/eslint-plugin-import/blob/main/docs/rules/group-exports.md
        'import/group-exports': 'off',

        // Excessive. Also, not suppored in TS w/ isolatedModules:
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md#when-not-to-use-it
        'import/named': 'error',

        // ensure named imports coupled with named exports
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
        'import/namespace': 'off',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
        'import/no-absolute-path': 'error',

        // Forbid import of modules using absolute paths
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md
        'import/no-amd': 'error',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
        'import/no-anonymous-default-export': ['off', {
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowArray: false,
          allowArrowFunction: false,
          allowLiteral: false,
          allowObject: false,
        }],

        // Reports if a module's default export is unnamed
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md
        'import/no-commonjs': 'off',

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
        'import/no-cycle': ['error', {
          ignoreExternal: true,
          maxDepth: '∞',
        }],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
        'import/no-unresolved': 'off',
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
        'import/no-useless-path-segments': ['error', { commonjs: true }],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
        // Excessive. Also, named exports help enforce readable imports.
        'import/prefer-default-export': 'off',

        'unused-imports/no-unused-imports': isInEditor ? 'warn' : 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        ...stylistic
          ? {
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},

      },
      settings: {
        'import/ignore': [
          'node_modules',
          '\\.(css|svg|json)$',
        ],
      },
    },
  ]
}
