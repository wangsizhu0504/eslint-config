import { pluginNode } from '../plugins'
import type { TypedFlatConfigItem } from '../types'

export async function node(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'kriszu/node/rules',
      plugins: {
        node: pluginNode,
      },
      rules: {
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/file-extension-in-import.md
        // TODO: Defer to import plugin
        'node/file-extension-in-import': ['error', 'always', {

          // TypeScript doesn't allow extensions https://github.com/Microsoft/TypeScript/issues/27481
          // Use .js instead
          '.ts': 'never',
          '.tsx': 'never',
        }],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md
        'node/global-require': 'error',
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/handle-callback-err.md
        'node/handle-callback-err': ['error', '^(err|error)$'],
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-deprecated-api.md
        'node/no-deprecated-api': 'error',
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-exports-assign.md
        'node/no-exports-assign': 'error',

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md
        'node/no-mixed-requires': ['error', {
          allowCall: true,
          grouping: true,
        }],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md
        'node/no-new-require': 'error',

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-path-concat.md
        'node/no-path-concat': 'error',

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/buffer.md
        'node/prefer-global/buffer': ['error', 'always'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/console.md
        'node/prefer-global/console': ['error', 'always'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md
        'node/prefer-global/process': ['error', 'never'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-decoder.md
        'node/prefer-global/text-decoder': ['error', 'always'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-encoder.md
        'node/prefer-global/text-encoder': ['error', 'always'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url.md
        'node/prefer-global/url': ['error', 'always'],

        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url-search-params.md
        'node/prefer-global/url-search-params': ['error', 'always'],
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/dns.md
        'node/prefer-promises/dns': 'error',
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/fs.md
        'node/prefer-promises/fs': 'error',
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/process-exit-as-throw.md
        'node/process-exit-as-throw': 'error',
      },
    },
  ]
}
