import { GLOB_EXCLUDE } from '../globs'
import type { ConfigItem, OptionsIgnores } from '../types'

export function ignores(options: OptionsIgnores = {}): ConfigItem[] {
  const {
    ignores: ignoresOption = [],
  } = options

  return [
    {
      ignores: [
        ...GLOB_EXCLUDE,
        ...ignoresOption,
      ],
    },
  ]
}
