import { GLOB_EXCLUDE } from '../globs'
import type { FlatConfigItem, OptionsIgnores } from '../types'

export async function ignores(options: OptionsIgnores = {}): Promise<FlatConfigItem[]> {
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
