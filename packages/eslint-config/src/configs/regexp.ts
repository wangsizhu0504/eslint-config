import type { OptionsOverrides, OptionsRegExp, TypedFlatConfigItem } from '../types'

import { configs } from 'eslint-plugin-regexp'

export async function regexp(
  options: OptionsRegExp & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const config = configs['flat/recommended'] as TypedFlatConfigItem

  const rules = {
    ...config.rules,
  }

  if (options.level === 'warn') {
    for (const key in rules) {
      // @ts-expect-error
      if (rules[key] === 'error')
        // @ts-expect-error
        rules[key] = 'warn'
    }
  }

  return [
    {
      name: 'kriszu/regexp/rules',
      ...config,
      rules: {
        ...rules,
        ...options.overrides,
      },
    },
  ]
}
