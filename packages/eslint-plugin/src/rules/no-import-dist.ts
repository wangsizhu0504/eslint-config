import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-import-dist'
export type MessageIds = 'noImportDist'
export type Options = []

export default createEslintRule<Options, MessageIds>({
  create: (context) => {
    function isDist(path: string): boolean {
      return Boolean((path.startsWith('.') && path.match(/\/dist(\/|$)/)))
        || path === 'dist'
    }

    return {
      ImportDeclaration: (node) => {
        if (isDist(node.source.value)) {
          context.report({
            data: {
              path: node.source.value,
            },
            messageId: 'noImportDist',
            node,
          })
        }
      },
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Prevent importing modules in `dist` folder',
    },
    messages: {
      noImportDist: 'Do not import modules in `dist` folder, got {{path}}',
    },
    schema: [],
    type: 'problem',
  },
  name: RULE_NAME,
})
