import { exec } from 'child_process'

export function isClean() {
  const porcelain = exec('git status --porcelain').exitCode
  const diff = exec('git diff-index --quiet HEAD').exitCode
  return !porcelain && !diff
}
