import chalk from 'chalk'

export function printAndExit(message, exit) {
  console.log(message)
  process.exit(exit)
}

export function print(message) {
  console.log(message)
}

export function printRedAndExit(message, exit) {
  printAndExit(chalk.red(message), exit)
}

export function printWhiteAndExit(message, exit) {
  printAndExit(chalk.white(message), exit)
}

export function printWhite(message) {
  print(chalk.white(message))
}
