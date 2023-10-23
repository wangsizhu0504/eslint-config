import { GLOB_EXCLUDE } from '../globs'
import type { ConfigItem } from '../types'

export function ignores(): ConfigItem[] {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ]
}
