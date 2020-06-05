import * as IO from './lib/utils/io'

import { Args, CommandHelp, Package, Version, VersionTypes } from './lib/types'
import { PackageUtils, VersionUtils } from './lib'

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

function parseArguments(rawArgs: string[]): Args {
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

function versionCommand(args: Args, pkg: Package): void {
  const pkgVersion = VersionUtils.parsePackageVersion(pkg)

  if (!pkgVersion) {
    IO.printRedAndExit('Invalid version format in package.json.', 1)
    return
  }

  IO.printWhite(
    `Current package version: ${VersionUtils.stringify(pkgVersion)}`
  )

  let newVersion: Version | undefined = pkgVersion

  if (!args.type) {
    IO.printRedAndExit('No version type specified.', 1)
    return
  }

  switch (args.type) {
    case VersionTypes.MAJOR:
    case VersionTypes.PREMAJOR:
      newVersion = VersionUtils.majorVersion(newVersion)
      break
    case VersionTypes.MINOR:
    case VersionTypes.PREMINOR:
      newVersion = VersionUtils.minorVersion(newVersion)
      break
    case VersionTypes.PATCH:
    case VersionTypes.PREPATCH:
      newVersion = VersionUtils.patchVersion(newVersion)
      break
    case VersionTypes.NIGHTLY:
      if (pkgVersion.pre === undefined) {
        newVersion = VersionUtils.patchVersion(newVersion)
      }
      break
    default:
      newVersion = VersionUtils.parseVersion(args.type)

      if (!newVersion) {
        IO.printRedAndExit('Invalid version format specified.', 1)
        return
      }
  }

  if (VersionUtils.isPreVersion(args.type)) {
    newVersion = VersionUtils.preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IO.printRedAndExit('Version was not changed.', 1)
  }

  pkg.version = VersionUtils.stringify(newVersion)

  PackageUtils.updatePackage(pkg)

  IO.printWhiteAndExit(
    `New package version: ${VersionUtils.stringify(newVersion)}`,
    0
  )
}

export function run(args: string[]): void {
  const parsedArgs = parseArguments(args)

  if (!parsedArgs.commands || !parsedArgs.commands.length) {
    IO.printRedAndExit('No command specified.', 1)
  }

  const pkg = PackageUtils.getPackage()

  switch (parsedArgs.commands[0]) {
    case Commands.VERSION:
      versionCommand(parsedArgs, pkg)
      return
    case Commands.CHANGE:
    // changeCommand(parsedArgs, pkg)
    default:
      IO.printRedAndExit(
        "Invalid command passed in. Run the command 'nspm help' for valid commands.",
        1
      )
  }
}
