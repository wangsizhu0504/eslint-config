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

        'import/first': 'error',
        // off: controlled by import/order
        'import/order': 'error',
        // 禁止已解析路径被导入多次。
        'import/no-duplicates': 'error',
        // 禁止使用 var 或 let 来导出可变内容。
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        // 禁止导入自身
        'import/no-self-import': 'error',
        // 禁止在导入中使用 Webpack 加载器语法。
        'import/no-webpack-loader-syntax': 'error',
        'import/no-unresolved': 'off',
        'import/no-absolute-path': 'off',

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

        ...stylistic
          ? {
            'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
          }
          : {},

      },
    },
  ]
}
