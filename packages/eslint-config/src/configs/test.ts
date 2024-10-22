import { GLOB_TESTS } from '../globs'
import { interopDefault } from '../utils'

import type { OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from '../types'

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any

export async function test(
  options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    isInEditor = false,
    overrides = {},
  } = options

  const [
    pluginVitest,
    pluginNoOnlyTests,
  ] = await Promise.all([
    interopDefault(import('@vitest/eslint-plugin')),
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const)

  _pluginTest = _pluginTest || {
    ...pluginVitest,
    rules: {
      ...pluginVitest.rules,
      // extend `test/no-only-tests` rule
      ...pluginNoOnlyTests.rules,
    },
  }

  return [
    {
      name: 'kriszu/test/setup',
      plugins: {
        test: _pluginTest,
      },
    },
    {
      files: GLOB_TESTS,
      name: 'kriszu/test/rules',
      rules: {
        'node/prefer-global/process': 'off',

        'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'test/no-identical-title': 'error',
        'test/no-only-tests': isInEditor ? 'off' : 'error',
        'test/prefer-hooks-in-order': 'error',
        'test/prefer-lowercase-title': 'error',
        'ts/explicit-function-return-type': 'off',
        'unicorn/consistent-function-scoping': 'off',

        ...overrides,
      },
    },
  ]
}
