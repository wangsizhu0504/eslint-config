type PaddingLineType = Array<{
  blankLine: 'always' | 'any'
  next:
  | 'block-like'
  | 'multiline-block-like'
  | 'break'
  | 'class'
  | 'continue'
  | '*'
  | 'const'
  | 'let'
  | 'var'
  | 'directive'
  | 'do'
  | 'for'
  | 'function'
  | 'if'
  | 'return'
  | 'switch'
  | 'try'
  | 'while'
  | ['const', 'let', 'var']
  prev:
  | '*'
  | 'block-like'
  | 'const'
  | 'let'
  | 'var'
  | 'directive'
  | ['const', 'let', 'var']
}>

export const paddingLines: PaddingLineType = [
  {
    blankLine: 'always',
    next: 'block-like',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: '*',
    prev: 'block-like',
  },
  {
    blankLine: 'always',
    next: 'multiline-block-like',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'break',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'class',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'continue',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: '*',
    prev: ['const', 'let', 'var'],
  },
  {
    blankLine: 'any',
    next: ['const', 'let', 'var'],
    prev: ['const', 'let', 'var'],
  },
  {
    blankLine: 'always',
    next: '*',
    prev: 'directive',
  },
  {
    blankLine: 'any',
    next: 'directive',
    prev: 'directive',
  },
  {
    blankLine: 'always',
    next: 'do',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'for',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'function',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'if',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'return',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'switch',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'try',
    prev: '*',
  },
  {
    blankLine: 'always',
    next: 'while',
    prev: '*',
  },
]
