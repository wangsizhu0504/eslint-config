import { execSync } from 'node:child_process'

export function isGitClean() {
  try {
    execSync('git diff-index --quiet HEAD --')
    return true
  // eslint-disable-next-line unused-imports/no-unused-vars, ts/no-unused-vars
  } catch (error) {
    return false
  }
}

export function getEslintConfigContent(
  mainConfig: string,
  additionalConfigs?: string[],
) {
  return `
import defineEslintConfig from '@kriszu/eslint-config'

export default defineEslintConfig({
${mainConfig}
}${additionalConfigs?.map(config => `,{\n${config}\n}`)})
`.trimStart()
}
