import type { OptionsIsInEditor, OptionsOverrides, OptionsStylistic, TypedFlatConfigItem } from '../types'

import { pluginImportLite, pluginKriszu, pluginUnusedImports } from '../plugins'

export async function imports(
  options: OptionsOverrides & OptionsIsInEditor & OptionsStylistic = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    overrides = {},
    stylistic = true,
  } = options
  return [
    {
      name: 'kriszu/imports/rules',
      plugins: {
        'import': pluginImportLite,
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
        ...stylistic
          ? {
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},
        ...overrides,
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
