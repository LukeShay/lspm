import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from 'fs'

import { Package } from '../types'

export const getPackage = (): Package => {
  return JSON.parse(readFileSync('./package.json', 'utf-8'))
}

export const updatePackage = (pkg: Package): Package => {
  copyFileSync('./package.json', './package-temp.json')
  writeFileSync('./package.json', JSON.stringify(pkg, null, 2))
  unlinkSync('./package-temp.json')

  return getPackage()
}
