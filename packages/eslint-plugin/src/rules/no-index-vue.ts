import path from 'path'
import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-index-vue'
export const MessageId = 'noIndexVue'
export type Options = []

export default createEslintRule<Options, typeof MessageId>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'Fix duplication in imports',
      recommended: 'strict',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      [MessageId]: 'Do not allow .vue files to be named index.vue',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      VueComponent(node) {
         const filePath = context.filename;
            const filename = path.basename(filePath);
            // Use index as the file name
            if (filename.toLowerCase() === 'index.vue') {
              // 查找defineOptions方法的调用
              const defineOptionsCall = context.sourceCode.getText(node).includes('defineOptions');
              // 如果没有定义name属性，则报告问题
              if (!defineOptionsCall || !/defineOptions\s*\(\s*{name:/.test(context.sourceCode.getText(node))) {
                context.report({
                  loc: { column: 0, line: 1 },
                  messageId: MessageId,
                });
              }
            }
      },
    }
  },
})
