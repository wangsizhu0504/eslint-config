import globals from 'globals'
import { pluginA11y, pluginReact, pluginReactHooks } from '../plugins'
import { GLOB_REACT } from '../globs'
import type { FlatConfigItem, OptionsOverrides } from '../types'

export async function react(
  options: OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const {
    overrides = {},
  } = options

  return [
    {
      plugins: {
        'jsx-a11y': pluginA11y,
        'react': pluginReact,
        'react-hooks': pluginReactHooks,
      },
    },
    {
      files: [GLOB_REACT],
      languageOptions: {
        ...pluginReact.configs.recommended.languageOptions,
        globals: {
          ...globals.browser,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...pluginReact.configs.all.rules,
        ...pluginReactHooks.configs.recommended.rules,
        ...pluginA11y.configs.recommended.rules,
        'jsx-a11y/accessible-emoji': ['warn'],
        'jsx-a11y/alt-text': [
          'warn',
          {
            'area': [],
            'elements': ['img', 'object', 'area', 'input[type="image"]'],
            'img': [],
            'input[type="image"]': [],
            'object': [],
          },
        ],
        'jsx-a11y/anchor-has-content': ['warn', { components: [] }],
        'jsx-a11y/anchor-is-valid': [
          'warn',
          {
            aspects: ['noHref', 'invalidHref', 'preferButton'],
            components: ['Link'],
            specialLink: ['to'],
          },
        ],
        'jsx-a11y/aria-activedescendant-has-tabindex': ['warn'],
        'jsx-a11y/aria-props': ['warn'],
        'jsx-a11y/aria-proptypes': ['warn'],
        'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: false }],
        'jsx-a11y/aria-unsupported-elements': ['warn'],
        'jsx-a11y/autocomplete-valid': ['off', { inputComponents: [] }],
        'jsx-a11y/click-events-have-key-events': ['warn'],
        'jsx-a11y/control-has-associated-label': [
          'warn',
          {
            controlComponents: [],
            depth: 5,
            ignoreElements: [
              'audio',
              'canvas',
              'embed',
              'input',
              'textarea',
              'tr',
              'video',
            ],
            ignoreRoles: [
              'grid',
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'row',
              'tablist',
              'toolbar',
              'tree',
              'treegrid',
            ],
            labelAttributes: ['label'],
          },
        ],
        'jsx-a11y/heading-has-content': ['warn', { components: [''] }],
        'jsx-a11y/html-has-lang': ['warn'],
        'jsx-a11y/iframe-has-title': ['warn'],
        'jsx-a11y/img-redundant-alt': ['warn'],
        'jsx-a11y/interactive-supports-focus': ['warn'],
        'jsx-a11y/label-has-associated-control': [
          'warn',
          {
            assert: 'both',
            controlComponents: [],
            depth: 25,
            labelAttributes: [],
            labelComponents: [],
          },
        ],
        'jsx-a11y/label-has-for': [
          'off',
          {
            allowChildren: false,
            components: [],
            required: {
              every: ['nesting', 'id'],
            },
          },
        ],
        'jsx-a11y/lang': ['warn'],
        'jsx-a11y/media-has-caption': [
          'warn',
          {
            audio: [],
            track: [],
            video: [],
          },
        ],
        'jsx-a11y/mouse-events-have-key-events': ['warn'],
        'jsx-a11y/no-access-key': ['warn'],
        'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],
        'jsx-a11y/no-distracting-elements': [
          'warn',
          { elements: ['marquee', 'blink'] },
        ],
        'jsx-a11y/no-interactive-element-to-noninteractive-role': [
          'warn',
          { tr: ['none', 'presentation'] },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': [
          'warn',
          {
            handlers: [
              'onClick',
              'onMouseDown',
              'onMouseUp',
              'onKeyPress',
              'onKeyDown',
              'onKeyUp',
            ],
          },
        ],
        'jsx-a11y/no-noninteractive-element-to-interactive-role': [
          'warn',
          {
            li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
            ol: [
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'tablist',
              'tree',
              'treegrid',
            ],
            table: ['grid'],
            td: ['gridcell'],
            ul: [
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'tablist',
              'tree',
              'treegrid',
            ],
          },
        ],
        'jsx-a11y/no-noninteractive-tabindex': [
          'warn',
          { roles: ['tabpanel'], tags: [] },
        ],
        'jsx-a11y/no-onchange': ['off'],
        'jsx-a11y/no-redundant-roles': ['warn'],
        'jsx-a11y/no-static-element-interactions': [
          'off',
          {
            handlers: [
              'onClick',
              'onMouseDown',
              'onMouseUp',
              'onKeyPress',
              'onKeyDown',
              'onKeyUp',
            ],
          },
        ],
        'jsx-a11y/role-has-required-aria-props': ['warn'],
        'jsx-a11y/role-supports-aria-props': ['warn'],
        'jsx-a11y/scope': ['warn'],
        'jsx-a11y/tabindex-no-positive': ['warn'],
        // deprecated -> moved to stylistic
        'jsx-quotes': ['off', 'prefer-single'],
        'react-hooks/exhaustive-deps': ['warn'],
        'react-hooks/rules-of-hooks': ['error'],
        'react/boolean-prop-naming': [
          'warn',
          { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+', validateNested: true },
        ],
        'react/button-has-type': [
          'error',
          { button: true, reset: false, submit: true },
        ],
        'react/default-props-match-prop-types': [
          'error',
          { allowRequiredDefaults: false },
        ],
        'react/destructuring-assignment': ['off', 'always'],
        'react/display-name': ['error', { ignoreTranspilerName: false }],
        'react/forbid-component-props': ['off', { forbid: [] }],
        'react/forbid-dom-props': ['off', { forbid: [] }],
        'react/forbid-elements': ['off', { forbid: [] }],
        'react/forbid-foreign-prop-types': ['error', { allowInPropTypes: true }],
        'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/hook-use-state': ['error'],
        'react/iframe-missing-sandbox': ['error'],
        'react/jsx-boolean-value': ['error', 'never', { always: [] }],
        'react/jsx-child-element-spacing': ['off'],
        'react/jsx-closing-bracket-location': [
          'off',
          { nonEmpty: 'tag-aligned', selfClosing: false },
        ],
        'react/jsx-closing-tag-location': ['off'],
        'react/jsx-curly-brace-presence': [
          'error',
          { children: 'ignore', propElementValues: 'always', props: 'never' },
        ],
        'react/jsx-curly-newline': [
          'off',
          { multiline: 'consistent', singleline: 'forbid' },
        ],
        'react/jsx-curly-spacing': ['error', 'never'],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'react/jsx-first-prop-new-line': ['off', 'multiline'],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-handler-names': [
          'error',
          { eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on' },
        ],
        'react/jsx-indent': ['off', 'tab'],
        'react/jsx-indent-props': ['off', 'tab'],
        'react/jsx-key': [
          'error',
          {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true,
          },
        ],
        'react/jsx-max-depth': ['off'],
        'react/jsx-max-props-per-line': ['off', { maximum: 3, when: 'multiline' }],
        'react/jsx-newline': ['off'],
        'react/jsx-no-bind': [
          'error',
          {
            allowArrowFunctions: true,
            allowBind: false,
            allowFunctions: false,
            ignoreDOMComponents: false,
            ignoreRefs: false,
          },
        ],
        'react/jsx-no-comment-textnodes': ['error'],
        'react/jsx-no-constructed-context-values': ['error'],
        'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
        'react/jsx-no-literals': ['off', { noStrings: true }],
        'react/jsx-no-script-url': ['error', [{ name: 'Link', props: ['to'] }]],
        'react/jsx-no-target-blank': [
          'error',
          { forms: true, links: true, warnOnSpreadAttributes: true },
        ],
        'react/jsx-no-undef': ['error'],
        'react/jsx-no-useless-fragment': ['error'],
        'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],
        'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
        'react/jsx-props-no-multi-spaces': ['error'],
        'react/jsx-props-no-spreading': [
          'off',
          {
            custom: 'enforce',
            exceptions: [],
            explicitSpread: 'ignore',
            html: 'enforce',
          },
        ],
        'react/jsx-sort-default-props': ['off', { ignoreCase: true }],
        'react/jsx-sort-prop-types': ['off'],
        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            locale: 'auto',
            multiline: 'ignore',
            noSortAlphabetically: true,
            reservedFirst: true,
            shorthandFirst: true,
          },
        ],
        'react/jsx-space-before-closing': ['off', 'always'],
        'react/jsx-tag-spacing': [
          'error',
          {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
          },
        ],
        'react/jsx-uses-react': ['off'],
        'react/jsx-uses-vars': ['error'],
        'react/jsx-wrap-multilines': [
          'error',
          {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'ignore',
            declaration: 'parens-new-line',
            logical: 'ignore',
            prop: 'ignore',
            return: 'parens-new-line',
          },
        ],
        'react/no-access-state-in-setstate': ['error'],
        'react/no-adjacent-inline-elements': ['off'],
        'react/no-array-index-key': ['error'],
        'react/no-arrow-function-lifecycle': ['error'],
        'react/no-children-prop': ['error'],
        'react/no-danger': ['error'],
        'react/no-danger-with-children': ['error'],
        'react/no-deprecated': ['error'],
        'react/no-did-mount-set-state': ['off'],
        'react/no-did-update-set-state': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/no-find-dom-node': ['error'],
        'react/no-invalid-html-attribute': ['error'],
        'react/no-is-mounted': ['error'],
        'react/no-multi-comp': ['off'],
        'react/no-namespace': ['error'],
        'react/no-redundant-should-component-update': ['error'],
        'react/no-render-return-value': ['error'],
        'react/no-set-state': ['off'],
        'react/no-string-refs': ['error', { noTemplateLiterals: true }],
        'react/no-this-in-sfc': ['error'],
        'react/no-typos': ['error'],
        'react/no-unescaped-entities': ['error'],
        'react/no-unknown-property': ['error'],
        'react/no-unsafe': ['error', { checkAliases: true }],
        'react/no-unstable-nested-components': ['error'],
        'react/no-unused-class-component-methods': ['error'],
        'react/no-unused-prop-types': [
          'error',
          { customValidators: [], skipShapeProps: true },
        ],
        'react/no-unused-state': ['error'],
        'react/no-will-update-set-state': ['error'],
        'react/prefer-es6-class': ['error', 'always'],
        'react/prefer-exact-props': ['error'],
        'react/prefer-read-only-props': ['error'],
        'react/prefer-stateless-function': [
          'error',
          { ignorePureComponents: true },
        ],
        'react/prop-types': [
          'error',
          { customValidators: [], ignore: [], skipUndeclared: false },
        ],
        'react/react-in-jsx-scope': ['off'],
        'react/require-default-props': [
          'off',
          { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
        ],
        'react/require-optimization': ['off', { allowDecorators: [] }],
        'react/require-render-return': ['error'],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react/sort-comp': [
          'off',
          {
            groups: {
              lifecycle: [
                'displayName',
                'propTypes',
                'contextTypes',
                'childContextTypes',
                'mixins',
                'statics',
                'defaultProps',
                'constructor',
                'getDefaultProps',
                'getInitialState',
                'state',
                'getChildContext',
                'getDerivedStateFromProps',
                'componentWillMount',
                'UNSAFE_componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'UNSAFE_componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'UNSAFE_componentWillUpdate',
                'getSnapshotBeforeUpdate',
                'componentDidUpdate',
                'componentDidCatch',
                'componentWillUnmount',
              ],
              rendering: ['/^render.+$/', 'render'],
            },
            order: [
              'static-variables',
              'static-methods',
              'instance-variables',
              'lifecycle',
              '/^handle.+$/',
              '/^on.+$/',
              'getters',
              'setters',
              '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
              'instance-methods',
              'everything-else',
              'rendering',
            ],
          },
        ],
        'react/sort-prop-types': [
          'off',
          {
            callbacksLast: false,
            ignoreCase: true,
            requiredFirst: false,
            sortShapeProp: true,
          },
        ],
        'react/state-in-constructor': ['error', 'never'],
        'react/static-property-placement': ['error', 'property assignment'],
        'react/style-prop-object': ['error', { allow: ['FormattedNumber'] }],
        'react/void-dom-elements-no-children': ['error'],
        ...overrides,
      },
    },
  ]
}
