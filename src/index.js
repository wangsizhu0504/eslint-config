module.exports =  {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'out',
    'coverage',
    'public',
    'temp',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    // ignore for in lint-staged
    '*.css',
    '*.png',
    '*.ico',
    '*.toml',
    '*.patch',
    '*.txt',
    '*.crt',
    '*.key',
    'Dockerfile',
    // force include
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  plugins: [
    'html',
    'unicorn',
    'no-only-tests',
    'unused-imports',
  ],
  extends:['./vue']
}
