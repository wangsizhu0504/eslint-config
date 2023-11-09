import { isPackageExists } from 'local-pkg'

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
]

export const hasTypeScript = isPackageExists('typescript')
export const hasReact = isPackageExists('react')
export const hasVue = VuePackages.some(i => isPackageExists(i))
