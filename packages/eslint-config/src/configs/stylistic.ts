import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'

import { pluginKriszu } from '../plugins'
import { interopDefault } from '../utils'

export const StylisticConfigDefaults: StylisticConfig = {
  experimental: false,
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: true,
}

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    experimental,
    indent,
    jsx,
    lessOpinionated = false,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    experimental,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  }) as TypedFlatConfigItem

  return [
    {
      name: 'kriszu/stylistic/rules',
      plugins: {
        kriszu: pluginKriszu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'kriszu/consistent-chaining': 'error',
        ...experimental
          ? {}
          : {
              'kriszu/consistent-list-newline': 'error',
            },

        ...(lessOpinionated
          ? {
              curly: ['error', 'all'],
            }
          : {
              'kriszu/curly': 'error',
              'kriszu/top-level-function': 'error',
            }
        ),

        'style/generator-star-spacing': ['error', { after: true, before: false }],
        'style/yield-star-spacing': ['error', { after: true, before: false }],

        // custom
        'style/brace-style': 'off',
        'style/indent-binary-ops': 'off',
        'style/member-delimiter-style': 'off',
        'style/no-mixed-spaces-and-tabs': 'off',
        'style/no-tabs': 'off',
        ...overrides,
      },
    },
  ]
}
