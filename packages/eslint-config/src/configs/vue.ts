import { mergeProcessors } from 'eslint-merge-processors'
import { pluginKriszu } from 'src/plugins'

import { GLOB_VUE } from '../globs'
import { interopDefault } from '../utils'

import type {
  OptionsFiles,
  OptionsHasTypeScript,
  OptionsOverrides,
  OptionsStylistic,
  OptionsVue,
  TypedFlatConfigItem,
} from '../types'

export async function vue(
  options: OptionsVue &
    OptionsHasTypeScript &
    OptionsOverrides &
    OptionsStylistic &
    OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_VUE],
    overrides = {},
    stylistic = true,
    vueVersion = 3,
  } = options
  const sfcBlocks = options.sfcBlocks === true ? {} : options.sfcBlocks ?? {}

  const { indent = 2 } = typeof stylistic === 'boolean' ? {} : stylistic

  const [pluginVue, parserVue, processorVueBlocks] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    interopDefault(import('eslint-processor-vue-blocks')),
  ] as const)

  return [
    {
      name: 'kriszu/vue/setup',
      plugins: {
        vue: pluginVue,
        kriszu: pluginKriszu,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: options.typescript
            ? ((await interopDefault(
                import('@typescript-eslint/parser'),
              )) as any)
            : null,
          sourceType: 'module',
        },
      },
      name: 'kriszu/vue/rules',
      processor:
        sfcBlocks === false
          ? pluginVue.processors['.vue']
          : mergeProcessors([
            pluginVue.processors['.vue'],
            processorVueBlocks({
              ...sfcBlocks,
              blocks: {
                styles: true,
                ...sfcBlocks.blocks,
              },
            }),
          ]),
      rules: {
        ...(pluginVue.configs.base.rules as any),
        ...(vueVersion === 2
          ? {
              ...(pluginVue.configs.essential.rules as any),
              ...(pluginVue.configs['strongly-recommended'].rules as any),
              ...(pluginVue.configs.recommended.rules as any),
            }
          : {
              ...(pluginVue.configs['vue3-essential'].rules as any),
              ...(pluginVue.configs['vue3-strongly-recommended'].rules as any),
              ...(pluginVue.configs['vue3-recommended'].rules as any),
            }),

        'no-undef': 'off',
        'no-unused-vars': 'off',
        'node/prefer-global/process': 'off',
        'style/indent': 'off',
        'kriszu/no-index-vue': 'error',

        'vue/block-lang': [
          'error',
          {
            script: {
              lang: ['js', 'ts', 'tsx'],
            },
            style: {
              lang: ['css', 'sass', 'scss', 'less', 'stylus', 'postcss'],
            },
            template: {
              lang: ['html', 'jade', 'pug', 'ejs'],
            },
          },
        ],
        'vue/block-order': [
          'error',
          {
            order: ['script:not([setup])', 'script[setup]', 'template', 'style'],
          },
        ],

        'vue/camelcase': 'off',
        // Uncategorized rules
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          { registeredComponentsOnly: true },
        ],
        'vue/component-options-name-casing': ['error', 'PascalCase'],

        // this is deprecated
        'vue/component-tags-order': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/define-macros-order': [
          'error',
          {
            order: [
              'defineOptions',
              'defineProps',
              'defineEmits',
              'defineSlots',
            ],
          },
        ],

        'vue/dot-location': ['error', 'property'],
        // extensions
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['warn', 'smart'],

        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-comment-content-newline': [
          'error',
          { multiline: 'always', singleline: 'ignore' },
        ],
        'vue/html-comment-content-spacing': [
          'error',
          'always',
          {
            exceptions: ['-'],
          },
        ],
        'vue/html-indent': ['error', indent],
        'vue/html-quotes': ['error', 'double'],

        'vue/html-self-closing': [
          'error',
          {
            html: {
              component: 'always',
              normal: 'always',
              void: 'always',
            },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/key-spacing': 'off',
        'vue/keyword-spacing': 'off',
        'vue/max-attributes-per-line': ['error', { singleline: { max: 10 }, multiline: { max: 1 } }],
        'vue/multi-word-component-names': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-console': [
          'error',
          { allow: ['error', 'warn', 'table', 'time'] },
        ],
        'vue/no-constant-condition': 'error',
        'vue/no-dupe-keys': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-extra-parens': 'off',
        'vue/no-irregular-whitespace': 'error',

        'vue/no-loss-of-precision': 'error',
        'vue/no-multi-spaces': 'off',
        // off
        'vue/no-multiple-template-root': 'off',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/no-sparse-arrays': 'error',
        'vue/no-static-inline-styles': 'off',
        'vue/no-unused-refs': 'error',
        'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
        'vue/no-use-v-else-with-v-for': 'error',
        'vue/no-useless-concat': 'error',
        'vue/no-useless-v-bind': ['error', { ignoreIncludesComment: true }],
        'vue/no-v-html': 'off',
        'vue/no-v-text-v-html-on-component': 'error',
        'vue/object-curly-newline': [
          'error',
          { consistent: true, multiline: true },
        ],
        'vue/object-property-newline': [
          'error',
          { allowMultiplePropertiesPerLine: true },
        ],
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/operator-linebreak': 'off',

        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/prefer-define-options': 'error',
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prefer-true-attribute-shorthand': 'off',
        // Override custom JS rules
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/require-default-prop': 'off',
        'vue/require-macro-variable-name': [
          'error',
          {
            defineEmits: 'emit',
            defineProps: 'props',
            defineSlots: 'slots',
            useAttrs: 'attrs',
            useSlots: 'slots',
          },
        ],
        'vue/require-prop-types': 'off',
        'vue/require-typed-ref': 'error',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        'vue/template-curly-spacing': 'off',
        'vue/v-for-delimiter-style': ['error', 'in'],

        ...(stylistic
          ? {
              'vue/array-bracket-spacing': ['error', 'never'],
              'vue/arrow-spacing': ['error', { after: true, before: true }],
              'vue/block-spacing': ['error', 'always'],
              'vue/block-tag-newline': [
                'error',
                {
                  multiline: 'always',
                  singleline: 'always',
                },
              ],
              'vue/brace-style': [
                'error',
                'stroustrup',
                { allowSingleLine: true },
              ],
              'vue/comma-dangle': ['error', 'always-multiline'],
              'vue/comma-spacing': ['error', { after: true, before: false }],
              'vue/comma-style': ['error', 'last'],
              'vue/html-comment-content-spacing': [
                'error',
                'always',
                {
                  exceptions: ['-'],
                },
              ],
              'vue/key-spacing': [
                'error',
                { afterColon: true, beforeColon: false },
              ],
              'vue/keyword-spacing': ['error', { after: true, before: true }],
              'vue/object-curly-newline': 'off',
              'vue/object-curly-spacing': ['error', 'always'],
              'vue/object-property-newline': [
                'error',
                { allowMultiplePropertiesPerLine: true },
              ],
              'vue/operator-linebreak': ['error', 'before'],
              'vue/padding-line-between-blocks': ['error', 'always'],
              'vue/quote-props': ['error', 'consistent-as-needed'],
              'vue/space-in-parens': ['error', 'never'],
              'vue/template-curly-spacing': 'error',
            }
          : {}),

        ...overrides,
      },
    },
  ]
}
