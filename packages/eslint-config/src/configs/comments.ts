import type { TypedFlatConfigItem } from '../types'

import { pluginComments } from '../plugins'

export async function comments(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'kriszu/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        // 不允许一个 eslint-enable 注释用于多个 eslint-disable 注释
        'eslint-comments/no-aggregating-enable': 'error',
        // 不允许重复的 eslint-disable 注释
        'eslint-comments/no-duplicate-disable': 'error',
        // 不允许特定规则的 eslint-disable 注释
        'eslint-comments/no-restricted-disable': 'off',
        // 不允许没有规则名称的 eslint-disable 注释
        'eslint-comments/no-unlimited-disable': 'error',
        // 不允许未使用的 eslint-disable 注释
        'eslint-comments/no-unused-disable': 'error',
        // 不允许未使用的 eslint-enable 注释
        'eslint-comments/no-unused-enable': 'error',
        // 完全不允许 ESLint 指令注释
        'eslint-comments/no-use': 'off',
      },
    },
  ]
}
