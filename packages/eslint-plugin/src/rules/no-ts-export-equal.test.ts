import { run } from './_test'
import rule, { RULE_NAME } from './no-ts-export-equal'

run({
  invalid: [
    {
      code: 'export = {}',
      errors(errors) {
        expect(errors.map(i => i.message))
          .toMatchInlineSnapshot(`
            [
              "Use ESM \`export default\` instead",
            ]
          `)
      },
      filename: 'test.ts',
    },
  ],
  name: RULE_NAME,
  rule,
  valid: [
    { code: 'export default {}', filename: 'test.ts' },
    { code: 'export = {}', filename: 'test.js' },
  ],
})
