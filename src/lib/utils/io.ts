import chalk from 'chalk'

export function printAndExit(message: string, exit: number): void {
  console.log(message)
  process.exit(exit)
}

export function print(message: string): void {
  console.log(message)
}

export function printRedAndExit(message: string, exit: number): void {
  printAndExit(chalk.red(message), exit)
}

export function printWhiteAndExit(message: string, exit: number): void {
  printAndExit(chalk.white(message), exit)
}

export function printWhite(message: string): void {
  print(chalk.white(message))
}
