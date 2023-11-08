import { GLOB_EXCLUDE } from '../globs'
import type { ConfigItem, OptionsIgnores } from '../types'

export function ignores(options: OptionsIgnores = {}): ConfigItem[] {
  const {
    ignores = [],
  } = options
  return [
    {
      ignores: [
        ...GLOB_EXCLUDE,
        ...ignores,
      ],
    },
  ]
}
