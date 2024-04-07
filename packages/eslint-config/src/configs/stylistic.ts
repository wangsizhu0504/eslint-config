import { interopDefault } from 'src'
import { pluginKriszu } from '../plugins'
import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(
  options: StylisticConfig & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    flat: true,
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

        'curly': ['error', 'multi-or-nest', 'consistent'],

        'kriszu/consistent-list-newline': 'error',
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
