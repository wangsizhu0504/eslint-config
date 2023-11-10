import fs from 'node:fs'

// @ts-expect-error missing types
import parse from 'parse-gitignore'
import type { FlatConfigItem, FlatGitignoreOptions } from './types'

export function gitignore(options: FlatGitignoreOptions = {}): FlatConfigItem {
  const ignores: string[] = []

  const {
    files: _files = '.gitignore',
  } = options
  const files = Array.isArray(_files) ? _files : [_files]

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const parsed = parse(content)
    const globs = parsed.globs()

    for (const glob of globs) {
      if (glob.type === 'ignore')
        ignores.push(...glob.patterns)
      else if (glob.type === 'unignore')
        ignores.push(...glob.patterns.map((pattern: string) => `!${pattern}`))
    }
  }

  return {
    ignores,
  }
}
