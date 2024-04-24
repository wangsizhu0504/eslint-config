import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  combine,
  comments,
  formatters,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  perfectionist,
  react,
  sortPackageJson,
  stylistic,
  test,
  typescript,
  unicorn,
  unocss,
  vue,
} from '../src'

const configs = await combine(
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  perfectionist(),
  react(),
  sortPackageJson(),
  stylistic(),
  test(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts = `
type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
${dts}`

await fs.writeFile('src/typegen.d.ts', dts)
