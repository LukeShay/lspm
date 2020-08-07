import * as IO from './lib/utils/io'

import { Args, CommandHelp } from './lib/types'

import { PackageUtils } from './lib/utils'
import { Version } from './lib/commands'
import arg from 'arg'

enum Commands {
  VERSION = 'version',
  CHANGE = 'change',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const COMMAND_HELP: CommandHelp[] = [
  {
    arg: 'version',
    message: 'Bumps the version in your package.json file',
  },
  {
    arg: 'change',
    message: 'Adds a change to CHANGELOG.json and CHANGELOG.md',
  },
]

const parseArguments = (rawArgs: string[]): Args => {
  const args = arg(
    {
      '--type': String,
      '-t': '--type',
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    commands: args['_'] || undefined,
    type: args['--type'],
  }
}

export const run = (args: string[]): void => {
  const parsedArgs = parseArguments(args)

  if (!parsedArgs.commands || !parsedArgs.commands.length) {
    IO.printRedAndExit('No command specified.', 1)
  }

  const pkg = PackageUtils.getPackage()

  switch (parsedArgs.commands[0]) {
    case Commands.VERSION:
      Version.run(parsedArgs, pkg)
      return
    // case Commands.CHANGE:
    // changeCommand(parsedArgs, pkg)
    default:
      IO.printRedAndExit(
        "Invalid command passed in. Run the command 'nspm help' for valid commands.",
        1
      )
  }
}
