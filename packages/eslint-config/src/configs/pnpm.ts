import type { TypedFlatConfigItem } from '../types'

import { interopDefault } from '../utils'

export async function pnpm(): Promise<TypedFlatConfigItem[]> {
  const [
    pluginPnpm,
    yamlParser,
    jsoncParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('yaml-eslint-parser')),
    interopDefault(import('jsonc-eslint-parser')),
  ])

  return [
    {
      name: 'kriszu/pnpm/package-json',
      files: [
        'package.json',
        '**/package.json',
      ],
      languageOptions: {
        parser: jsoncParser,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/json-enforce-catalog': 'error',
        'pnpm/json-prefer-workspace-settings': 'error',
        'pnpm/json-valid-catalog': 'error',
      },
    },
    {
      name: 'kriszu/pnpm/pnpm-workspace-yaml',
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: yamlParser,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    },
  ]
}
