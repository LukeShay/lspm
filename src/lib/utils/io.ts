import chalk from 'chalk'

export const printAndExit = (message: string, exit: number): void => {
  console.log(message)
  process.exit(exit)
}

export const print = (message: string): void => {
  console.log(message)
}

export const printRedAndExit = (message: string, exit: number): void => {
  printAndExit(chalk.red(message), exit)
}

export const printWhiteAndExit = (message: string, exit: number): void => {
  printAndExit(chalk.white(message), exit)
}

export const printWhite = (message: string): void => {
  print(chalk.white(message))
}
