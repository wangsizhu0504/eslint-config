import { pluginImport, pluginKriszu, pluginUnusedImports } from '../plugins'
import type { FlatConfigItem, OptionsStylistic } from '../types'

export async function imports(options: OptionsStylistic = {}): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'kriszu:imports',
      plugins: {
        'import': pluginImport,
        'kriszu': pluginKriszu,
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'import/first': 'error',
        'import/namespace': 'off',
        'import/no-absolute-path': 'off',

        // 禁止已解析路径被导入多次。
        'import/no-duplicates': 'error',
        // 禁止使用 var 或 let 来导出可变内容。
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-default': 'error',
        // 禁止导入自身
        'import/no-self-import': 'error',
        'import/no-unresolved': 'off',
        // 禁止在导入中使用 Webpack 加载器语法。
        'import/no-webpack-loader-syntax': 'error',
        // off: controlled by import/order
        'import/order': 'error',

        'kriszu/import-dedupe': 'error',
        // Enforce newlines inside named import
        'kriszu/import-enforce-newlines': [
          'error',
          {
            'items': 5,
            'max-len': 120,
            'semi': false,
          },
        ],
        'kriszu/no-import-dist': 'error',
        'kriszu/no-import-node-modules-by-path': 'error',

        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
        ],
        ...stylistic
          ? {
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},

      },
    },
  ]
}
