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
      '--version': Boolean,
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
    version: args['--version'] || false,
    major: args['--major'] || false,
    minor: args['--minor'] || false,
    patch: args['--patch'] || false,
    premajor: args['--premajor'] || false,
    preminor: args['--preminor'] || false,
    prepatch: args['--prepatch'] || false,
    prerelease: args['--prerelease'] || false,
  }
}

async function versionCommand(args, pkg) {
  const pkgVersion = await Version.parsePackageVersion(pkg)

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
  }

  if (args.prerelease || args.premajor || args.preminor || args.prepatch) {
    newVersion = await Version.preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IO.printRedAndExit('No version specified', 1)
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
