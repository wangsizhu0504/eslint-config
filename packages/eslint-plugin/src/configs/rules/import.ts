import { defineRules } from '../../utils'

export default defineRules({
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'type',
      ],
      pathGroups: [
        {
          pattern: '@/**',
          group: 'external',
          position: 'after',
        },
        {
          pattern: '~/**',
          group: 'external',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['type'],
    },
  ],
  'import/first': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-unresolved': 'off',
  'import/no-absolute-path': 'off',
  'import/newline-after-import': ['error', { count: 1, considerComments: true }],
  'import/no-self-import': 'error',

  'import/no-named-as-default-member': 'off',
  'import/no-named-as-default': 'off',
  'import/namespace': 'off',
  'sort-imports': [
    'error',
    {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false,
    },
  ],
})
