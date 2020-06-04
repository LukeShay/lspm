import { readFileSync, copyFileSync, writeFileSync, unlinkSync } from 'fs'

export function getPackage() {
  return JSON.parse(readFileSync('./package.json', 'utf-8'))
}

export function updatePackage(pkg) {
  copyFileSync('./package.json', './package-temp.json')
  writeFileSync('./package.json', JSON.stringify(pkg, null, 2))
  unlinkSync('./package-temp.json')

  const newPkg = getPackage()

  return newPkg
}
