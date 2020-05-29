import chalk from 'chalk'

export async function printAndExit(message, exit) {
  console.log(message)
  process.exit(exit)
}

export async function print(message) {
  console.log(message)
}

export async function printRedAndExit(message, exit) {
  printAndExit(chalk.red(message), exit)
}

export async function printWhiteAndExit(message, exit) {
  printAndExit(chalk.white(message), exit)
}

export async function printWhite(message) {
  print(chalk.white(message))
}
