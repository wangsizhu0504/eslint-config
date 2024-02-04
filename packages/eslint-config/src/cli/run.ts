import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import prompts from 'prompts'
import c from 'picocolors'

// @ts-expect-error missing types
import parse from 'parse-gitignore'
import {
  ARROW,
  CHECK,
  WARN,
  eslintVersion,
  version,
  vscodeSettingsString,
} from './constants'
import { isGitClean } from './utils'

export interface RuleOptions {
  /**
   * Skip prompts and use default values
   */
  yes?: boolean
}

export async function run(options: RuleOptions = {}) {
  const SKIP_PROMPT = !!process.env.SKIP_PROMPT || options.yes
  const SKIP_GIT_CHECK = !!process.env.SKIP_GIT_CHECK

  const cwd = process.cwd()

  const pathFlatConfig = path.join(cwd, 'eslint.config.js')
  const pathPackageJSON = path.join(cwd, 'package.json')
  const pathESLintIgnore = path.join(cwd, '.eslintignore')

  if (fs.existsSync(pathFlatConfig)) {
    console.log(c.yellow(`${WARN} eslint.config.js already exists, migration wizard exited.`))
    return process.exit(1)
  }

  if (!SKIP_GIT_CHECK && !isGitClean()) {
    const { confirmed } = await prompts({
      initial: false,
      message: 'There are uncommitted changes in the current repository, are you sure to continue?',
      name: 'confirmed',
      type: 'confirm',
    })
    if (!confirmed)
      return process.exit(1)
  }

  // Update package.json
  console.log(c.cyan(`${ARROW} bumping @kriszu/eslint-config to v${version}`))
  const packageContent = await fsp.readFile(pathPackageJSON, 'utf8')
  const package_: Record<string, any> = JSON.parse(packageContent)

  package_.devDependencies ??= {}
  package_.devDependencies['@kriszu/eslint-config'] = `^${version}`

  if (!package_.devDependencies.eslint)
    package_.devDependencies.eslint = eslintVersion

  await fsp.writeFile(pathPackageJSON, JSON.stringify(package_, null, 2))
  console.log(c.green(`${CHECK} changes wrote to package.json`))

  // End update package.json
  // Update eslint files
  const eslintIgnores: string[] = []
  if (fs.existsSync(pathESLintIgnore)) {
    console.log(c.cyan(`${ARROW} migrating existing .eslintignore`))
    const content = await fsp.readFile(pathESLintIgnore, 'utf8')
    const parsed = parse(content)
    const globs = parsed.globs()

    for (const glob of globs) {
      if (glob.type === 'ignore')
        eslintIgnores.push(...glob.patterns)
      else if (glob.type === 'unignore')
        eslintIgnores.push(...glob.patterns.map((pattern: string) => `!${pattern}`))
    }
  }

  let eslintConfigContent = ''

  const kriszuConfig = `${eslintIgnores.length > 0 ? `ignores: ${JSON.stringify(eslintIgnores)}` : ''}`
  if (package_.type === 'module') {
    eslintConfigContent = `
import defineEslintConfig from '@kriszu/eslint-config'

export default defineEslintConfig({\n${kriszuConfig}\n})
`.trimStart()
  }
  else {
    eslintConfigContent = `
const defineEslintConfig = require('@kriszu/eslint-config').default

module.exports = defineEslintConfig({\n${kriszuConfig}\n})
`.trimStart()
  }

  await fsp.writeFile(pathFlatConfig, eslintConfigContent)
  console.log(c.green(`${CHECK} created eslint.config.js`))

  const files = fs.readdirSync(cwd)
  const legacyConfig: string[] = []
  files.forEach((file) => {
    if (file.includes('eslint') || file.includes('prettier'))
      legacyConfig.push(file)
  })
  if (legacyConfig.length > 0) {
    console.log(`${WARN} you can now remove those files manually:`)
    console.log(`   ${c.dim(legacyConfig.join(', '))}`)
  }

  // End update eslint files
  // Update .vscode/settings.json
  let promptResult: prompts.Answers<'updateVscodeSettings'> = {
    updateVscodeSettings: true,
  }

  if (!SKIP_PROMPT) {
    try {
      promptResult = await prompts({
        initial: true,
        message: 'Update .vscode/settings.json for better VS Code experience?',
        name: 'updateVscodeSettings',
        type: 'confirm',
      }, {
        onCancel: () => {
          throw new Error(`Cancelled`)
        },
      })
    }
    catch (error: any) {
      console.log(error.message)
      return
    }
  }

  if (promptResult?.updateVscodeSettings ?? true) {
    const dotVscodePath: string = path.join(cwd, '.vscode')
    const settingsPath: string = path.join(dotVscodePath, 'settings.json')

    if (!fs.existsSync(dotVscodePath))
      await fsp.mkdir(dotVscodePath, { recursive: true })

    if (fs.existsSync(settingsPath)) {
      let settingsContent = await fsp.readFile(settingsPath, 'utf8')

      settingsContent = settingsContent.trim().replace(/\s*}$/, '')
      settingsContent += settingsContent.endsWith(',') || settingsContent.endsWith('{') ? '' : ','
      settingsContent += `${vscodeSettingsString}}\n`

      await fsp.writeFile(settingsPath, settingsContent, 'utf-8')
      console.log(c.green(`${CHECK} updated .vscode/settings.json`))
    } else {
      await fsp.writeFile(settingsPath, `{${vscodeSettingsString}}\n`, 'utf-8')
      console.log(c.green(`${CHECK} created .vscode/settings.json`))
    }
  }

  // End update .vscode/settings.json
  console.log(c.green(`${CHECK} migration completed`))
  console.log(`Now you can update the dependencies and run ${c.blue('eslint . --fix')}\n`)
}
