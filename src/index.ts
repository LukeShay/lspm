import * as IO from './lib/utils/io'

import { Args, Package, Version } from './lib/types'
import { FileUtils, VersionUtils } from './lib'

import arg from 'arg'

const Commands = {
  VERSION: 'version',
}

function parseArguments(rawArgs: string[]): Args {
  const args = arg(
    {
      '--custom': String,
      '--major': Boolean,
      '--minor': Boolean,
      '--patch': Boolean,
      '--premajor': Boolean,
      '--preminor': Boolean,
      '--prepatch': Boolean,
      '--prerelease': Boolean,
      '--release': Boolean,
      '--nightly': Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    commands: args['_'] || undefined,
    custom: args['--custom'] || undefined,
    major: args['--major'] || undefined,
    minor: args['--minor'] || undefined,
    patch: args['--patch'] || undefined,
    premajor: args['--premajor'] || undefined,
    preminor: args['--preminor'] || undefined,
    prepatch: args['--prepatch'] || undefined,
    prerelease: args['--prerelease'] || undefined,
    release: args['--release'] || undefined,
    nightly: args['--nightly'] || undefined,
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

  if (args.major || args.premajor) {
    newVersion = VersionUtils.majorVersion(newVersion)
  } else if (args.minor || args.preminor) {
    newVersion = VersionUtils.minorVersion(newVersion)
  } else if (
    args.patch ||
    args.prepatch ||
    (args.nightly && pkgVersion.pre === undefined)
  ) {
    newVersion = VersionUtils.patchVersion(newVersion)
  } else if (args.release) {
    newVersion = VersionUtils.releaseVersion(newVersion)
  } else if (args.custom) {
    newVersion = VersionUtils.parseVersion(args.custom)

    if (!newVersion) {
      IO.printRedAndExit('Invalid version format specified.', 1)
      return
    }
  }

  if (
    args.prerelease ||
    args.premajor ||
    args.preminor ||
    args.prepatch ||
    args.nightly
  ) {
    newVersion = VersionUtils.preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IO.printRedAndExit('Version was not changed.', 1)
  }

  pkg.version = VersionUtils.stringify(newVersion)

  FileUtils.updatePackage(pkg)

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

  const pkg = FileUtils.getPackage()

  switch (parsedArgs.commands[0]) {
    case Commands.VERSION:
      versionCommand(parsedArgs, pkg)
      return
    default:
      IO.printRedAndExit(
        "Invalid command passed in. Run the command 'nspm help' for valid commands.",
        1
      )
  }
}
