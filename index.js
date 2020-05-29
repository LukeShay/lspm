import clear from 'clear'
import chalk from 'chalk'
import * as figlet from 'figlet'

import { getPackage, updatePackage } from './lib/files'
import inquirer from './lib/inquirer'
import { Version } from './lib/utils'
import arg from 'arg'
import * as IO from './lib/io'

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
      argv: rawArgs.slice(3),
    }
  )
  return {
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

async function versionCommand(args, pkg) {
  const pkgVersion = await Version.parsePackageVersion(pkg)

  if (!pkgVersion) {
    console.log(pkgVersion)

    IO.printRedAndExit('Invalid version format in package.json.')
  }

  IO.printWhite(
    `Current package version: ${await Version.stringify(pkgVersion)}`
  )

  let newVersion = pkgVersion

  if (args.major || args.premajor) {
    newVersion = await Version.majorVersion(newVersion)
  } else if (args.minor || args.preminor) {
    newVersion = await Version.minorVersion(newVersion)
  } else if (args.patch || args.prepatch) {
    newVersion = await Version.patchVersion(newVersion)
  } else if (args.version) {
    newVersion = await Version.parseVersion(args.version)
    if (!newVersion) {
      IO.printRedAndExit('Invalid version format specified.', 1)
    }
  }

  if (args.prerelease || args.premajor || args.preminor || args.prepatch) {
    newVersion = await Version.preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IO.printRedAndExit('Version was not changed.', 1)
  }

  pkg.version = await Version.stringify(newVersion)

  updatePackage(pkg)

  IO.printWhiteAndExit(
    `New package version: ${await Version.stringify(newVersion)}`,
    0
  )
}

export async function run(args) {
  console.log(
    chalk.yellow(figlet.textSync('LSPM', { horizontalLayout: 'full' }))
  )

  const command = args[2] || undefined

  if (!command) {
    IO.printRedAndExit('No command specified.', 1)
  }

  args = parseArguments(args)

  const pkg = await getPackage()

  if (command === 'version') {
    versionCommand(args, pkg)
  }
}
