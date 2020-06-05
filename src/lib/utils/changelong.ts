import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from 'fs'

import { Changelog } from '../types'

export function getChangelog(): Changelog {
  return JSON.parse(readFileSync('./CHANGELOG.json', 'utf-8'))
}

export function updateChangelog(cl: Changelog): Changelog {
  copyFileSync('./CHANGELONG.json', './CHANGELONG-temp.json')
  writeFileSync('./CHANGELONG.json', JSON.stringify(cl, null, 2))
  unlinkSync('./CHANGELONG-temp.json')

  return getChangelog()
}
