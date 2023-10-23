import { version } from '../package.json'
import genericSpacing from './rules/generic-spacing'
import importDedupe from './rules/import-dedupe'
import preferInlineTypeImport from './rules/prefer-inline-type-import'
import topLevelFunction from './rules/top-level-function'
import noImportNodeModulesByPath from './rules/no-import-node-modules-by-path'
import noTsExportEqual from './rules/no-ts-export-equal'
import noCjsExports from './rules/no-cjs-exports'
import namedTupleSpacing from './rules/named-tuple-spacing'
import consistentListNewline from './rules/consistent-list-newline'
import type { ESLint, Linter } from 'eslint'

const plugin = {
  meta: {
    name: 'kriszu',
    version,
  },
  rules: {
    'consistent-list-newline': consistentListNewline,
    'generic-spacing': genericSpacing,
    'import-dedupe': importDedupe,
    'named-tuple-spacing': namedTupleSpacing,
    'no-cjs-exports': noCjsExports,
    'no-import-node-modules-by-path': noImportNodeModulesByPath,
    'no-ts-export-equal': noTsExportEqual,
    'prefer-inline-type-import': preferInlineTypeImport,
    'top-level-function': topLevelFunction,
  },
} satisfies ESLint.Plugin

export default plugin

type RuleDefinitations = typeof plugin['rules']

export type RuleOptions = {
  [K in keyof RuleDefinitations]: RuleDefinitations[K]['defaultOptions']
}

export type Rules = {
  [K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>
}
