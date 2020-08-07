import { exec } from 'child_process'

export const isClean = (): boolean => {
  const porcelain = exec('git status --porcelain').exitCode
  const diff = exec('git diff-index --quiet HEAD').exitCode
  return !porcelain && !diff
}
