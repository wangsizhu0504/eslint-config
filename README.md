# @kriszu/eslint-config [![npm](https://img.shields.io/npm/v/@kriszu/eslint-config.svg)](https://npmjs.com/package/@kriszu/eslint-config)

> kriszu eslint configuration  based on @antfu/eslint-config.

Flat ESLint config for JavaScript, TypeScript, Vue 2, Vue 3.

## Features

- Support Vue 2 and 3 out-of-box.
- Support JSON(5), YAML, Markdown...
- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- Sorted imports, dangling commas

> You don't need `.eslintignore` normally as it has been provided by the preset.

## Install

```bash
pnpm i -D eslint @kriszu/eslint-config
```
Config .eslintrc

```jsonc
{
  "extends": "@kriszu/eslint-config"
}
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
Config VSCode auto fix
File .vscode/setting.json
```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks
```

###  Reference project

[antfu/eslint-config](https://github.com/antfu/eslint-config)

[sxzz/eslint-config](https://github.com/sxzz/eslint-config)


## License

[MIT](./LICENSE) License © 2022-PRESENT [WSZ](https://github.com/wangsizhu0504)
