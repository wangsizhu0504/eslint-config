import { pluginImport, pluginKriszu } from '../plugins'
import type { ConfigItem, OptionsStylistic } from '../types'

export function imports(options: OptionsStylistic = {}): ConfigItem[] {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'kriszu:imports',
      plugins: {
        kriszu: pluginKriszu,
        import: pluginImport,
      },
      rules: {
        'kriszu/import-dedupe': 'error',
        'kriszu/no-import-node-modules-by-path': 'error',

        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'type',
            ],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'external',
                position: 'after',
              },
              {
                pattern: '~/**',
                group: 'external',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['type'],
          },
        ],
        'import/first': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-unresolved': 'off',
        'import/no-absolute-path': 'off',
        'import/no-self-import': 'error',

        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/namespace': 'off',
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
        'import/no-duplicates': 'error',
        'import/no-named-default': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
            'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
          }
          : {},

      },
    },
  ]
}
