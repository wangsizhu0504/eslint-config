import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'

import { pluginKriszu } from '../plugins'

import { interopDefault } from '../utils'

export const StylisticConfigDefaults: StylisticConfig = {
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
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'kriszu/stylistic/rules',
      plugins: {
        kriszu: pluginKriszu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        ...(lessOpinionated
          ? {
              curly: ['error', 'all'],
            }
          : {
              'kriszu/curly': 'error',
            }
        ),

        'kriszu/consistent-list-newline': 'error',
        'kriszu/consistent-chaining': 'error',
        'kriszu/top-level-function': 'error',

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
