import { getPackageInfoSync } from 'local-pkg'

export function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (
    pkg
    && typeof pkg.version === 'string'
    && !Number.isNaN(+pkg.version[0])
  )
    return +pkg.version[0]

  return 3
}
