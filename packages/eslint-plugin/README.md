# @kriszu/eslint-plugin

[![npm version](https://img.shields.io/npm/v/@kriszu/eslint-plugin?color=yellow)](https://npmjs.com/package/@kriszu/eslint-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@kriszu/eslint-plugin?color=yellow)](https://npmjs.com/package/@kriszu/eslint-plugin)

Extended ESLint rules for Kriszu's coding style preferences.

## 📦 Installation

```bash
pnpm add -D @kriszu/eslint-plugin
```

## 📖 Usage

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-plugin'

export default [
  {
    plugins: {
      kriszu
    },
    rules: {
      'kriszu/top-level-function': 'error',
      'kriszu/import-dedupe': 'error',
      // ... other rules
    }
  }
]
```

Or use with [@kriszu/eslint-config](https://github.com/wangsizhu0504/eslint-config) which includes this plugin by default:

```bash
pnpm add -D @kriszu/eslint-config
```

## 🔗 Related

- [@kriszu/eslint-config](https://github.com/wangsizhu0504/eslint-config) - My ESLint flat config presets

## 📄 License

[MIT](../../LICENSE) License © 2024-PRESENT [Kriszu](https://github.com/wangsizhu0504)
