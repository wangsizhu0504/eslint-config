import { pluginPerfectionist } from '../plugins'
import type { TypedFlatConfigItem } from '../types'

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'kriszu/perfectionist/rules',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ]
}
