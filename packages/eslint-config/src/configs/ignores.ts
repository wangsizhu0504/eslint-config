import type { TypedFlatConfigItem } from '../types'

import { GLOB_EXCLUDE, GLOB_TS, GLOB_TSX } from '../globs'

export async function ignores(
  userIgnores: string[] | ((originals: string[]) => string[]) = [],
  ignoreTypeScript = false,
): Promise<TypedFlatConfigItem[]> {
  let ignoresList = [
    ...GLOB_EXCLUDE,
  ]

  if (ignoreTypeScript) {
    ignoresList.push(GLOB_TS, GLOB_TSX)
  }

  if (typeof userIgnores === 'function') {
    ignoresList = userIgnores(ignoresList)
  } else {
    ignoresList = [
      ...ignoresList,
      ...userIgnores,
    ]
  }

  return [
    {
      name: 'kriszu/ignores',
      ignores: ignoresList,
    },
  ]
}
