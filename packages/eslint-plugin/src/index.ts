import type { ESLint, Linter } from 'eslint';
import { version } from '../package.json';
import importDedupe from './rules/import-dedupe';
import topLevelFunction from './rules/top-level-function';
import noImportNodeModulesByPath from './rules/no-import-node-modules-by-path';
import noTsExportEqual from './rules/no-ts-export-equal';
import consistentListNewline from './rules/consistent-list-newline';
import consistentChaining from './rules/consistent-chaining';
// import importEnforceNewlines from './rules/import-enforce-newlines';
import noImportDist from './rules/no-import-dist';
import noIndexVue from './rules/no-index-vue';
import indentUnindent from './rules/indent-unindent';
import curly from './rules/curly';

const plugin = {
  meta: {
    name: 'kriszu',
    version,
  },
  rules: {
    'consistent-chaining': consistentChaining,
    'consistent-list-newline': consistentListNewline,
    'import-dedupe': importDedupe,
    curly: curly,
    'indent-unindent': indentUnindent,
    'no-import-node-modules-by-path': noImportNodeModulesByPath,
    'no-ts-export-equal': noTsExportEqual,
    'no-import-dist': noImportDist,
    'top-level-function': topLevelFunction,
    'no-index-vue': noIndexVue,
  },
} satisfies ESLint.Plugin;

export default plugin;

type RuleDefinitions = (typeof plugin)['rules'];

export type RuleOptions = {
  [K in keyof RuleDefinitions]: RuleDefinitions[K]['defaultOptions'];
};

export type Rules = {
  [K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>;
};
