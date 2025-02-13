import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-import-node-modules-by-path'
export type MessageIds = 'noImportNodeModulesByPath'
export type Options = []

export default createEslintRule<Options, MessageIds>({
  create: (context) => {
    return {
      'CallExpression[callee.name="require"]': (node: any) => {
        const value = node.arguments[0]?.value
        if (typeof value === 'string' && value.includes('/node_modules/')) {
          context.report({
            messageId: 'noImportNodeModulesByPath',
            node,
          })
        }
      },
      'ImportDeclaration': (node) => {
        if (node.source.value.includes('/node_modules/')) {
          context.report({
            messageId: 'noImportNodeModulesByPath',
            node,
          })
        }
      },
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Prevent importing modules in `node_modules` folder by relative or absolute path',
    },
    messages: {
      noImportNodeModulesByPath: 'Do not import modules in `node_modules` folder by path',
    },
    schema: [],
    type: 'problem',
  },
  name: RULE_NAME,
})
