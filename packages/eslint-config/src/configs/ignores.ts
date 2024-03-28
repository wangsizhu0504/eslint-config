import { GLOB_EXCLUDE } from '../globs'
import type { OptionsIgnores, TypedFlatConfigItem } from '../types'

export async function ignores(options: OptionsIgnores = {}): Promise<TypedFlatConfigItem[]> {
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
