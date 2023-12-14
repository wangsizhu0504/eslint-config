import type { ESLint, Linter } from 'eslint'
import { version } from '../package.json'
import importDedupe from './rules/import-dedupe'
import topLevelFunction from './rules/top-level-function'
import noImportNodeModulesByPath from './rules/no-import-node-modules-by-path'
import noTsExportEqual from './rules/no-ts-export-equal'
import consistentListNewline from './rules/consistent-list-newline'
import importEnforceNewlines from './rules/import-enforce-newlines'

const plugin = {
  meta: {
    name: 'kriszu',
    version,
  },
  rules: {
    'consistent-list-newline': consistentListNewline,
    'import-dedupe': importDedupe,
    'no-import-node-modules-by-path': noImportNodeModulesByPath,
    'no-ts-export-equal': noTsExportEqual,
    'top-level-function': topLevelFunction,
    'import-enforce-newlines': importEnforceNewlines,
  },
} satisfies ESLint.Plugin

export default plugin

type RuleDefinitions = typeof plugin['rules']

export type RuleOptions = {
  [K in keyof RuleDefinitions]: RuleDefinitions[K]['defaultOptions']
}

export type Rules = {
  [K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>
}
