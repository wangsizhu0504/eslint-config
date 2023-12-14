import type { FlatConfigItem } from 'src/types'
import { pluginUnicorn } from '../plugins'

export async function unicorn(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'kriszu:unicorn',
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        // 抛出错误时传递错误消息
        'unicorn/error-message': 'error',
        // 大写正则表达式转义
        'unicorn/escape-case': 'error',
        // 使用 Array.isArray 而不是 instanceof
        'unicorn/no-array-instanceof': 'error',
        // 防止使用已弃用的 `new Buffer()`
        'unicorn/no-new-buffer': 'error',
        // 保持正则表达式字面量安全！
        'unicorn/no-unsafe-regex': 'off',
        // 为八进制、十六进制、二进制小写数字格式化（0x1'error' 而不是 0X1'error'）
        'unicorn/number-literal-case': 'error',
        // 使用 ** 而不是 Math.pow()
        'unicorn/prefer-exponentiation-operator': 'error',
        // 检查存在时使用 includes 而不是 indexOf
        'unicorn/prefer-includes': 'error',
        // 更好的使用 node: protocol
        'unicorn/prefer-node-protocol': 'error',
        // 更喜欢使用“Number.isNaN”等数字属性而不是“isNaN”
        'unicorn/prefer-number-properties': 'error',
        // 字符串方法 startsWith/endsWith 而不是更复杂的东西
        'unicorn/prefer-starts-ends-with': 'error',
        // 使用 textContent 而不是 innerText
        'unicorn/prefer-text-content': 'error',
        // 在检查 typeof 时抛出错误时强制抛出类型错误
        'unicorn/prefer-type-error': 'error',
        // 抛出错误时使用 new
        'unicorn/throw-new-error': 'error',
      },
    },
  ]
}
