import { exec } from 'child_process'

export async function isClean() {
  return !exec('git status --untracked-files=no --porcelain').exitCode
}
