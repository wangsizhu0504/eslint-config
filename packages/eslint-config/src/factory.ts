import process from 'node:process'
import fs from 'node:fs'
import { gitignore } from './gitignore'
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  react,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  test,
  typescript,
  unicorn,
  unocss,
  vue,
} from './configs'
import { combine } from './utils'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import { hasReact, hasTypeScript, hasVue } from './env'

const flatConfigProps: Array<keyof FlatConfigItem> = [
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
]

/**
 * Construct an array of ESLint flat config items.
 */
export function kriszu(options: OptionsConfig & FlatConfigItem = {}, ...userConfigs: Array<Awaitable<UserConfigItem | UserConfigItem[]>>): Promise<UserConfigItem[]> {
  const {
    componentExts = [],
    gitignore: enableGitignore = true,
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
    react: enableReact = hasReact,
    typescript: enableTypeScript = hasTypeScript,
    unocss: enableUnoCSS = false,
    vue: enableVue = hasVue,
  } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}

  if (stylisticOptions && !('jsx' in stylisticOptions))
    stylisticOptions.jsx = options.jsx ?? true

  const configs: Array<Awaitable<FlatConfigItem[]>> = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push([gitignore(enableGitignore)])
    } else {
      if (fs.existsSync('.gitignore'))
        configs.push([gitignore()])
    }
  }

  // Base configs
  configs.push(
    ignores({}),
    javascript({
      isInEditor,
      overrides: getOverrides(options, 'javascript'),
    }),
    comments(),
    node(),
    jsdoc({
      stylistic: stylisticOptions,
    }),
    imports({
      stylistic: stylisticOptions,
    }),
    unicorn(),
    // Optional plugins (installed but not enabled by default)
    perfectionist(),
  )

  if (enableVue)
    componentExts.push('vue')

  if (enableTypeScript) {
    configs.push(typescript({
      ...resolveSubOptions(options, 'typescript'),
      ...typeof enableTypeScript !== 'boolean'
        ? enableTypeScript
        : {},
      componentExts,
    }))
  }

  if (stylisticOptions) {
    configs.push(stylistic({
      ...stylisticOptions,
      overrides: getOverrides(options, 'stylistic'),
    }))
  }

  if (options.test ?? true) {
    configs.push(test({
      isInEditor,
      overrides: getOverrides(options, 'test'),
    }))
  }

  if (enableVue) {
    configs.push(vue({
      ...resolveSubOptions(options, 'vue'),
      stylistic: stylisticOptions,
      typescript: !!enableTypeScript,
    }))
  }

  if (enableReact) {
    configs.push(react({
      overrides: getOverrides(options, 'react'),
      typescript: !!enableTypeScript,
    }))
  }
  if (enableUnoCSS) {
    configs.push(unocss({
      ...resolveSubOptions(options, 'unocss'),
      overrides: getOverrides(options, 'unocss'),
    }))
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    )
  }

  if (options.markdown ?? true) {
    configs.push(markdown({
      componentExts,
      overrides: getOverrides(options, 'markdown'),
    }))
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any

    return acc
  }, {} as FlatConfigItem)

  if (Object.keys(fusedConfig).length)
    configs.push([fusedConfig])

  const merged = combine(
    ...configs,
    ...userConfigs,
  )

  return merged
}
export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
) {
  const sub = resolveSubOptions(options, key)
  return {
    ...(options.overrides as any)?.[key],
    ...'overrides' in sub
      ? sub.overrides
      : {},
  }
}
