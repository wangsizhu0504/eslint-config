import type { OptionsUnicorn, TypedFlatConfigItem } from '../types'

import { pluginUnicorn } from '../plugins'

export async function unicorn(
  options: OptionsUnicorn = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    allRecommended = false,
    overrides = {},
  } = options
  return [
    {
      name: 'kriszu/unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...(allRecommended
          ? pluginUnicorn.configs.recommended.rules
          : {

              'unicorn/consistent-empty-array-spread': 'error',
              // Conflicts with eslint-plugin-n/no-deprecated-api
              // Pass error message when throwing errors
              'unicorn/error-message': 'error',

              // Uppercase regex escapes
              'unicorn/escape-case': 'error',

              // Good rule and would like warning but no autofix
              // Some low level libraries that compile using babel would prefer to use
              // 使用 Array.isArray 而不是 instanceof
              'unicorn/no-instanceof-builtins': 'error',

              // Ban `new Array` as `Array` constructor's params are ambiguous
              'unicorn/no-new-array': 'off',
              // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-deprecated-api.md
              'unicorn/no-new-buffer': 'off',
              // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
              'unicorn/number-literal-case': 'error',

              // includes over indexOf when checking for existence
              'unicorn/prefer-includes': 'error',
              // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1273#issuecomment-1069506684
              // Prefer using the node: protocol
              'unicorn/prefer-node-protocol': 'error',
              // Prefer using number properties like `Number.isNaN` rather than `isNaN`
              'unicorn/prefer-number-properties': 'error',
              // String methods startsWith/endsWith instead of more complicated stuff
              // 字符串方法 startsWith/endsWith 而不是更复杂的东西
              'unicorn/prefer-string-starts-ends-with': 'error',
              // textContent instead of innerText
              // 使用 textContent 而不是 innerText
              'unicorn/prefer-dom-node-text-content': 'error',
              // Enforce throwing type error when throwing error while checking typeof
              'unicorn/prefer-type-error': 'error',
              // Use new when throwing error
              'unicorn/throw-new-error': 'error',

              // custom
              /**
               * For-of + iterators currently requires transpilation:
               * https://www.typescriptlang.org/tsconfig#downlevelIteration
               *
               * Given this cost, it doesn't make sense to use instead of for-loops yet
               */
              'unicorn/no-for-loop': 'off',
              // Disable even warnings because of autofix
              'unicorn/prefer-export-from': [
                'off',
                {
                  ignoreUsedVariables: true,
                },
              ],
              'unicorn/prefer-json-parse-buffer': 'off',

            }),
        ...overrides,
      },
    },
  ]
}
