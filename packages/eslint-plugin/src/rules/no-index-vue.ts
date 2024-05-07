import path from 'node:path'
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-index-vue'
export type MessageIds = 'noIndexVue' | 'defineOptions' | 'defineComponent'
export type Options = []
export const defineOptionRegex = /defineOptions\(\{(?:[^']|'[^']*')*name\s*:\s*'([^']+)'(?:[^']|'[^']*')*\}/

/**
 * Gets the element of `<script setup>`
 * @param {RuleContext} context The ESLint rule context object.
 * @returns {VElement | null} the element of `<script setup>`
 */
function getScriptSetupElement(context: RuleContext<MessageIds, Options>) {
  const sourceCode = context.sourceCode as any
  const df
    = sourceCode.parserServices?.getDocumentFragment
    && sourceCode.parserServices.getDocumentFragment()
  if (!df)
    return null

  const scripts = df.children.filter(
    (e: any) => e.type === 'VElement' && e.name === 'script',
  )
  if (scripts.length === 2) {
    return scripts.find((e: any) => hasAttribute(e, 'setup')) || null
  } else {
    const script = scripts[0]
    if (script && hasAttribute(script, 'setup'))
      return script
  }
  return null
}

/**
 * Check whether the given start tag has specific directive.
 * @param {VElement} node The start tag node to check.
 * @param {string} name The attribute name to check.
 * @param {string} [value] The attribute value to check.
 * @returns {boolean} `true` if the start tag has the attribute.
 */
function hasAttribute(node: any, name: string, value?: string) {
  return Boolean(getAttribute(node, name, value))
}

/**
 * Get the attribute which has the given name.
 * @param {VElement} node The start tag node to check.
 * @param {string} name The attribute name to check.
 * @param {string} [value] The attribute value to check.
 * @returns {VAttribute | null} The found attribute.
 */
function getAttribute(node: any, name: string, value?: string) {
  return (
    node.startTag.attributes.find(
      (n: any) =>
        !n.directive
        && n.key.name === name
        && (value === undefined
          || (n.value != null && n.value.value === value)),
    ) || null
  )
}

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'Better optimize vue component naming',
      recommended: 'strict',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      noIndexVue: '`Index` cannot be used as the vue component name. Please change the file name or use `defineOptions` to define the component name.',
      defineOptions: 'Please add name to `defineOptions` to define the component name.',
      defineComponent: 'Please add the name attribute to define the component name in `defineComponent`',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      Program(node) {
        const filePath = context.filename
        const filename = path.basename(filePath)
        const isScriptSetup = Boolean(getScriptSetupElement(context))
        const codeContent = context.sourceCode.getText(node)

        // Use index as the file name
        if (['index.vue'].includes(filename.toLowerCase())) {
          if (isScriptSetup) {
            const defineOptionsCall = codeContent.includes('defineOptions')
            if (!defineOptionsCall) {
              context.report({
                loc: { column: 0, line: 1 },
                messageId: 'noIndexVue',
              })
            } else if (!defineOptionRegex.test(codeContent)) {
              context.report({
                loc: { column: 0, line: 1 },
                messageId: 'defineOptions',
              })
            }
          }
        }
      },
    }
  },
})
