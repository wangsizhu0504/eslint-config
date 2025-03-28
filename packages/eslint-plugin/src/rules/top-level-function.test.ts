import { run } from './_test'
import rule, { RULE_NAME } from './top-level-function'

const valids = [
  'function foo() {}',
  // allow arrow function inside function
  'function foo() { const bar = () => {} }',
  // allow arrow function when type is specified
  'const Foo: Bar = () => {}',
  // allow let/var
  'let foo = () => {}',
  // allow arrow function in as
  'const foo = (() => {}) as any',
  // allow iife
  ';(() => {})()',
  // allow export default
  'export default () => {}',
  'export default defineConfig(() => {})',
  // allow one-line arrow function
  'const foo = (x, y) => x + y',
  'const foo = async (x, y) => x + y',
  'const foo = () => String(123)',
  'const foo = () => ({})',
]

const invalids = [
  [
    'const foo = (x, y) => \nx + y',
    'function foo (x, y) {\n  return x + y\n}',
  ],
  [
    'const foo = (as: string, bar: number) => { return as + bar }',
    'function foo (as: string, bar: number) { return as + bar }',
  ],
  [
    'const foo = <K, T extends Boolean>(as: string, bar: number): Omit<T, K> => \nas + bar',
    'function foo <K, T extends Boolean>(as: string, bar: number): Omit<T, K> {\n  return as + bar\n}',
  ],
  [
    'export const foo = () => {}',
    'export function foo () {}',
  ],
  [
    'export const foo = () => \n({})',
    'export function foo () {\n  return {}\n}',
  ],
  [
    'export const foo = async () => \n({})',
    'export async function foo () {\n  return {}\n}',
  ],
]

run({
  invalid: invalids.map(i => ({
    code: i[0],
    errors: [{ messageId: 'topLevelFunctionDeclaration' }],
    output: i[1],
  })),
  name: RULE_NAME,
  rule,
  valid: valids,
})
