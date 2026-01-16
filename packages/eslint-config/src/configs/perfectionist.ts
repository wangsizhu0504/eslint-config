import type { TypedFlatConfigItem } from '../types'

import { pluginPerfectionist } from '../plugins'

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
      rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': ['error', {
          groups: [
            'type-import',
            ['type-parent', 'type-sibling', 'type-index', 'type-internal'],

            'value-builtin',
            'value-external',
            'value-internal',
            ['value-parent', 'value-sibling', 'value-index'],
            'side-effect',
            'ts-equals-import',
            'unknown',
          ],
          newlinesBetween: 'ignore',
          order: 'asc',
          type: 'natural',
        }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      },
    },
  ]
}
