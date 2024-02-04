import { pluginPerfectionist } from '../plugins'
import type { FlatConfigItem } from '../types'

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'kriszu:perfectionist',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-array-includes': 'off',
        'perfectionist/sort-astro-attributes': ['error', { type: 'natural' }],
        'perfectionist/sort-enums': ['error', { type: 'natural' }],
        'perfectionist/sort-jsx-props': ['error', { type: 'line-length' }],
        'perfectionist/sort-object-types': ['error', { type: 'natural' }],
        'perfectionist/sort-svelte-attributes': ['error', { type: 'line-length' }],
        'perfectionist/sort-union-types': ['error', { type: 'natural' }],
        'perfectionist/sort-vue-attributes': ['error', { type: 'line-length' }],
      },
    },
  ]
}
