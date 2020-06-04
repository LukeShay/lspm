import { getPackage, updatePackage } from './lib/files'
import { Version } from './lib/utils'
import arg from 'arg'
import * as IO from './lib/io'

const Commands = {
  VERSION: 'version',
}

function parseArguments(rawArgs) {
  const args = arg(
    {
      '--version': String,
      '--major': Boolean,
      '--minor': Boolean,
      '--patch': Boolean,
      '--premajor': Boolean,
      '--preminor': Boolean,
      '--prepatch': Boolean,
      '--prerelease': Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    commands: args['_'] || undefined,
    version: args['--version'] || undefined,
    major: args['--major'] || undefined,
    minor: args['--minor'] || undefined,
    patch: args['--patch'] || undefined,
    premajor: args['--premajor'] || undefined,
    preminor: args['--preminor'] || undefined,
    prepatch: args['--prepatch'] || undefined,
    prerelease: args['--prerelease'] || undefined,
  }
}

function versionCommand(args, pkg) {
  const pkgVersion = Version.parsePackageVersion(pkg)

  if (!pkgVersion) {
    IO.printRedAndExit('Invalid version format in package.json.')
  }

  IO.printWhite(`Current package version: ${Version.stringify(pkgVersion)}`)

  let newVersion = pkgVersion

  if (args.major || args.premajor) {
    newVersion = Version.majorVersion(newVersion)
  } else if (args.minor || args.preminor) {
    newVersion = Version.minorVersion(newVersion)
  } else if (args.patch || args.prepatch) {
    newVersion = Version.patchVersion(newVersion)
  } else if (args.version) {
    newVersion = Version.parseVersion(args.version)
    if (!newVersion) {
      IO.printRedAndExit('Invalid version format specified.', 1)
    }
  }

  if (args.prerelease || args.premajor || args.preminor || args.prepatch) {
    newVersion = Version.preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IO.printRedAndExit('Version was not changed.', 1)
  }

  pkg.version = Version.stringify(newVersion)

  updatePackage(pkg)

  IO.printWhiteAndExit(
    `New package version: ${Version.stringify(newVersion)}`,
    0
  )
}

export function run(args) {
  args = parseArguments(args)

  if (!args.commands || !args.commands.length) {
    IO.printRedAndExit('No command specified.', 1)
  }

  const pkg = getPackage()

  switch (args.commands[0]) {
    case Commands.VERSION:
      versionCommand(args, pkg)
      return
    default:
      IO.printRedAndExit(
        "Invalid command passed in. Run the command 'nspm help' for valid commands.",
        1
      )
  }
}
