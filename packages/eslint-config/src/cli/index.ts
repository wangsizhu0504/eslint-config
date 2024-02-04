import process from 'node:process'
import { hideBin } from 'yargs/helpers'
import c from 'picocolors'
import yargs from 'yargs'
import { run } from './run'
import { CROSS, version } from './constants'

function header() {
  console.log(`\n${c.green(`@kriszu/eslint-config `)}${c.dim(`v${version}`)}`)
}

const instance = yargs(hideBin(process.argv))
  .scriptName('@kriszu/eslint-config')
  .usage('')
  .command(
    '*',
    'Run the initialization or migration',
    arguments_ => arguments_
      .option('yes', { alias: 'y', description: 'Skip prompts and use default values', type: 'boolean' })
      .help(),
    async (arguments_) => {
      header()
      console.log()
      try {
        await run(arguments_)
      }
      catch (error) {
        console.error(c.inverse(c.red(' Failed to migrate ')))
        console.error(c.red(`${CROSS} ${String(error)}`))
        process.exit(1)
      }
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', version)
  .alias('v', 'version')

instance
  .help()
  .argv
