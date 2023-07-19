import { defineConfig } from '../utils'

export default defineConfig({
  extends: [
    'plugin:yml/standard',
  ],
  rules: {
    // 强制使用单引号
    'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
    // 允许空文档
    'yml/no-empty-document': 'off',
    // 允许空map值
    'yml/no-empty-mapping-value': 'off',
  },
})
