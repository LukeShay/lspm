import { Args, Package, Version, VersionTypes } from '../types'
import { IOUtils, PackageUtils } from '../utils'

const stringify = (version: Version): string => {
  return `${version.major}.${version.minor}.${version.patch}${
    version.pre !== undefined ? '-' + version.pre : ''
  }`
}

const parseVersion = (version: string): Version | undefined => {
  const versionRegex = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(-(?<pre>\d+))?$/

  if (!version) return undefined

  const versionGroups = version.match(versionRegex)?.groups

  const parseSplitI = (num: string | undefined): number | undefined =>
    num === undefined || isNaN(parseInt(num)) ? undefined : parseInt(num)

  const major = parseSplitI(versionGroups?.major)
  const minor = parseSplitI(versionGroups?.minor)
  const patch = parseSplitI(versionGroups?.patch)
  const pre = parseSplitI(versionGroups?.pre)

  return major === undefined || minor === undefined || patch === undefined
    ? undefined
    : {
        major,
        minor,
        patch,
        pre,
      }
}

const majorVersion = (version: Version): Version => {
  return {
    ...version,
    major: version.major + 1,
    pre: undefined,
  }
}

const minorVersion = (version: Version): Version => {
  return {
    ...version,
    minor: version.minor + 1,
    pre: undefined,
  }
}

const patchVersion = (version: Version): Version => {
  return {
    ...version,
    patch: version.patch + 1,
    pre: undefined,
  }
}

const preVersion = (version: Version): Version => {
  return {
    ...version,
    pre: version.pre === undefined || isNaN(version.pre) ? 0 : version.pre + 1,
  }
}

// const releaseVersion = (version: Version): Version => {
//   return {
//     ...version,
//     pre: undefined,
//   }
// }

const isPreVersion = (versionType: string | undefined): boolean => {
  return (
    versionType === VersionTypes.PREMAJOR ||
    versionType === VersionTypes.PREMINOR ||
    versionType === VersionTypes.PREPATCH ||
    versionType === VersionTypes.NIGHTLY
  )
}

export const run = (args: Args, pkg: Package): void => {
  const pkgVersion = parseVersion(pkg.version)

  if (!pkgVersion) {
    IOUtils.printRedAndExit('Invalid version format in package.json.', 1)
    return
  }

  IOUtils.printWhite(`Current package version: ${stringify(pkgVersion)}`)

  let newVersion: Version | undefined = pkgVersion

  if (!args.type) {
    IOUtils.printRedAndExit('No version type specified.', 1)
    return
  }

  switch (args.type) {
    case VersionTypes.MAJOR:
    case VersionTypes.PREMAJOR:
      newVersion = majorVersion(newVersion)
      break
    case VersionTypes.MINOR:
    case VersionTypes.PREMINOR:
      newVersion = minorVersion(newVersion)
      break
    case VersionTypes.PATCH:
    case VersionTypes.PREPATCH:
      newVersion = patchVersion(newVersion)
      break
    case VersionTypes.NIGHTLY:
      if (pkgVersion.pre === undefined) {
        newVersion = patchVersion(newVersion)
      }
      break
    default:
      newVersion = parseVersion(args.type)

      if (!newVersion) {
        IOUtils.printRedAndExit('Invalid version format specified.', 1)
        return
      }
  }

  if (isPreVersion(args.type)) {
    newVersion = preVersion(newVersion)
  }

  if (pkgVersion === newVersion) {
    IOUtils.printRedAndExit('Version was not changed.', 1)
  }

  pkg.version = stringify(newVersion)

  PackageUtils.updatePackage(pkg)

  IOUtils.printWhiteAndExit(`New package version: ${stringify(newVersion)}`, 0)
}
