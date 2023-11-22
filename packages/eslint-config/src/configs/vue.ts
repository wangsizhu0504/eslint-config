import { GLOB_VUE } from '../globs'
import { parserTs, parserVue, pluginVue } from '../plugins'
import type {
  FlatConfigItem,
  OptionsHasTypeScript,
  OptionsOverrides,
  OptionsStylistic,
  OptionsVueVersion,
} from '../types'

export async function vue(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsVueVersion = {},
): Promise<FlatConfigItem[]> {
  const {
    overrides = {},
    stylistic = true,
    version = 3,
  } = options

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const isVue3 = version === 3

  return [
    {
      name: 'kriszu:vue:setup',
      plugins: {
        vue: pluginVue,
      },
    },
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: options.typescript ? parserTs as any : null,
          sourceType: 'module',
        },
      },
      name: 'kriszu:vue:rules',
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.base.rules as any,
        ...(isVue3 ? pluginVue.configs['vue3-essential'].rules : pluginVue.configs.essential.rules) as any,
        ...(isVue3 ? pluginVue.configs['vue3-strongly-recommended'].rules : pluginVue.configs['strongly-recommended'].rules) as any,
        ...(isVue3 ? pluginVue.configs['vue3-recommended'].rules : pluginVue.configs.recommended.rules) as any,

        'node/prefer-global/process': 'off',
        'style/indent': 'off',
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],

        'vue/block-tag-newline': ['error', {
          multiline: 'always',
          singleline: 'always',
        }],

        'vue/camelcase': 'off',
        'vue/comma-dangle': ['error', 'always-multiline'],
        // Uncategorized rules
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: true,
        }],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': ['error', {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-comment-content-spacing': ['error', 'always', {
          exceptions: ['-'],
        }],
        'vue/html-indent': ['error', indent],
        'vue/html-quotes': ['error', 'double'],
        'vue/max-attributes-per-line': ['warn', { singleline: 4 }],
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': ['error', 'functions'],
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',

        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',

        'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/no-v-text-v-html-on-component': 'error',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],

        'vue/padding-line-between-blocks': ['error', 'always'],

        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        // Override custom JS rules
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

        ...stylistic
          ? {
              'vue/array-bracket-spacing': ['error', 'never'],
              'vue/arrow-spacing': ['error', { after: true, before: true }],
              'vue/block-spacing': ['error', 'always'],
              'vue/block-tag-newline': ['error', {
                multiline: 'always',
                singleline: 'always',
              }],
              'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
              'vue/comma-dangle': ['error', 'always-multiline'],
              'vue/comma-spacing': ['error', { after: true, before: false }],
              'vue/comma-style': ['error', 'last'],
              'vue/html-comment-content-spacing': ['error', 'always', {
                exceptions: ['-'],
              }],
              'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'vue/keyword-spacing': ['error', { after: true, before: true }],
              'vue/object-curly-newline': 'off',
              'vue/object-curly-spacing': ['error', 'always'],
              'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'vue/operator-linebreak': ['error', 'before'],
              'vue/padding-line-between-blocks': ['error', 'always'],
              'vue/quote-props': ['error', 'consistent-as-needed'],
              'vue/space-in-parens': ['error', 'never'],
              'vue/template-curly-spacing': 'error',
            }
          : {},

        ...overrides,
        ...isVue3
          ? {
              'vue/define-macros-order': ['error', {
                order: [
                  'defineOptions',
                  'defineProps',
                  'defineEmits',
                  'defineSlots',
                ],
              }],
              // reactivity transform
              'vue/no-setup-props-reactivity-loss': 'off',
              'vue/prefer-import-from-vue': 'off',
              'vue/require-prop-types': 'off',
            }
          : {},
      },
    },
  ]
}
