import { defineRules } from '../../utils'

export default defineRules({
  'vue/prefer-import-from-vue': 'off',
  'vue/require-prop-types': 'off',
  // reactivity transform
  'vue/no-setup-props-reactivity-loss': 'off',
  'vue/define-macros-order': ['error', {
    order: [
      'defineOptions',
      'defineProps',
      'defineEmits',
      'defineSlots',
    ],
  }],
})
