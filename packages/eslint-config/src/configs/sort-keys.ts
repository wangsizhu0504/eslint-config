import { pluginSortKeys } from '../plugins'
import type { ConfigItem } from '../types'

/**
 * Optional sort-keys plugin
 *
 * @see https://github.com/namnm/eslint-plugin-sort-keys
 */
export function sortKeys(): ConfigItem[] {
  return [
    {
      name: 'kriszu:sort-keys',
      plugins: {
        'sort-keys': pluginSortKeys,
      },
    },
  ]
}
