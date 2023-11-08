# @kriszu/eslint-config [![npm](https://img.shields.io/npm/v/@kriszu/eslint-config.svg)](https://npmjs.com/package/@kriszu/eslint-config)

> kriszu eslint configuration  based on @antfu/eslint-config.

Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3.

## Features

- Support Vue 2 and 3 out-of-box.
- Support JSON(5), YAML, Markdown...
- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- Sorted imports, dangling commas
- Designed to work with TypeScript, Vue out-of-box
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!

## Install

```bash
pnpm i -D eslint @kriszu/eslint-config
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu()
```

With CJS:

```js
// eslint.config.js
const kriszu = require('@kriszu/eslint-config').default

module.exports = kriszu()
```

### Add script for package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## Customization

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

The `kriszu` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu(
  {
    // flat config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced Example</summary>

We don't recommend using this style in general usages, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  typescript,
  unicorn,
  vue,
  yaml,
} from '@kriszu/eslint-config'

export default [
  ...ignores(),
  ...javascript(/* Options */),
  ...comments(),
  ...node(),
  ...jsdoc(),
  ...imports(),
  ...unicorn(),
  ...typescript(/* Options */),
  ...stylistic(),
  ...vue(),
  ...jsonc(),
  ...yaml(),
  ...markdown(),
]
```

</details>

### Plugins Renaming

| New Prefix | Original Prefix | Source Plugin |
| --- | --- | --- |
| `import/*` | `i/*` | [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) |
| `node/*` | `n/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `yaml/*` | `yml/*` | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) |
| `ts/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*` | `@stylistic/*` | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu(
  { vue: true, typescript: true },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'never'],
    },
  }
)
```

We also provided an `overrides` options to make it easier:

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu({
  overrides: {
    vue: {
      'vue/operator-linebreak': ['error', 'before'],
    },
    typescript: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
    yaml: {},
    // ...
  }
})
```

### Optional Rules

This config also provides some optional plugins/rules for extended usages.

#### `perfectionist` (sorting)

This plugin [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist) allows you to sorted object keys, imports, etc, with auto-fix.

The plugin is installed but no rules are enabled by default.

It's recommended to opt-in on each file individually using [configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1).

```js
const objectWantedToSort = {
  a: 2,
  b: 1,
  c: 3,
}
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import kriszu from '@kriszu/eslint-config'

export default kriszu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

###  Reference project

[antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

[MIT](./LICENSE) License © 2022-PRESENT [Kriszu](https://github.com/wangsizhu0504)
