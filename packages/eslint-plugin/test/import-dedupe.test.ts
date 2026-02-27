import rule, { RULE_NAME } from '../src/rules/import-dedupe'
import { run } from './_test'

const valids = [
  'import { a } from \'foo\'',
]
const invalids = [
  [
    'import { a, b, a, a, c, a } from \'foo\'',
    'import { a, b,   c,  } from \'foo\'',
  ],
]

run({
  name: RULE_NAME,
  rule,
  valid: valids,
  invalid: invalids.map(i => ({
    code: i[0],
    output: i[1],
    errors: [{ messageId: 'importDedupe' }, { messageId: 'importDedupe' }, { messageId: 'importDedupe' }],
  })),
})
