import { configStandard } from './constants'
import type { TSESLint } from '@typescript-eslint/utils'

/** 定义Eslint配置 */
export function defineConfig(config: TSESLint.Linter.Config): TSESLint.Linter.Config {
  return config
}

/** 定义Eslint规则 */
export function defineRules(rules: TSESLint.Linter.Config['rules']): TSESLint.Linter.Config['rules'] {
  return rules
}

/** 定义Eslint插件 */
export function definePlugin(plugin: TSESLint.Linter.Plugin): TSESLint.Linter.Plugin {
  return plugin
}

/** 从Standard规则中获取Eslint规则 */
export const ruleFromStandard = (name: string): TSESLint.Linter.RuleEntry => {
  if (configStandard.rules === undefined) throw new Error('rules can not be undefined')
  const rule = configStandard.rules[name]
  if (rule === undefined) throw new Error('rule can not be undefined')
  if (typeof rule !== 'object') return rule
  return JSON.parse(JSON.stringify(rule))
}

/** [key,value] 数组转对象 */
export function fromEntries<T>(iterable: Array<[string, T]>): Record<string, T> {
  return [...iterable].reduce<Record<string, T>>((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}
