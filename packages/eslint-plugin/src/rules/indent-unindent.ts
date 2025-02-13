import { createEslintRule, unindent } from '../utils'

export type MessageIds = 'indent-unindent'
export type Options = [{
  indent?: number
  tags?: string[]
}]

export default createEslintRule<Options, MessageIds>({
  create(context) {
    const {
      indent = 2,
      tags = ['$', 'unindent', 'unIndent'],
    } = context.options?.[0] ?? {}

    return {
      TaggedTemplateExpression(node) {
        const id = node.tag
        if (!id || id.type !== 'Identifier')
          return
        if (!tags.includes(id.name))
          return
        if (node.quasi.quasis.length !== 1)
          return
        const quasi = node.quasi.quasis[0]
        const value = quasi.value.raw
        const lineStartIndex = context.sourceCode.getIndexFromLoc({
          column: 0,
          line: node.loc.start.line,
        })
        const baseIndent = context.sourceCode.text.slice(lineStartIndex).match(/^\s*/)?.[0] ?? ''
        const targetIndent = baseIndent + ' '.repeat(indent)
        const pure = unindent([value] as any)
        let final = pure
          .split('\n')
          .map(line => targetIndent + line)
          .join('\n')

        final = `\n${final}\n${baseIndent}`

        if (final !== value) {
          context.report({
            fix: fixer => fixer.replaceText(quasi, `\`${final}\``),
            messageId: 'indent-unindent',
            node: quasi,
          })
        }
      },
    }
  },
  defaultOptions: [{}],
  meta: {
    docs: {
      description: 'Enforce consistent indentation in `unindent` template tag',
    },
    fixable: 'code',
    messages: {
      'indent-unindent': 'Consistent indentation in unindent tag',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          indent: {
            default: 2,
            minimum: 0,
            type: 'number',
          },
          tags: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'layout',
  },
  name: 'indent-unindent',
})
