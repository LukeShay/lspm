import { Package, Version } from '../../types'

export function stringify(version: Version): string {
  return `${version.major}.${version.minor}.${version.patch}${
    version.pre !== undefined ? '-' + version.pre : ''
  }`
}

export function parseVersion(version: string): Version | undefined {
  if (!version) return undefined

  const split = version.split('.')

  const minor = split[2]

  const minorSplit = minor.split('-')

  if (minorSplit.length > 1) {
    split[2] = minorSplit[0]
    split[3] = minorSplit[1]
  }

  const parseSplitI = (num): number | undefined =>
    isNaN(parseInt(num)) ? undefined : parseInt(num)

  const parsedVersion = {
    major: parseSplitI(split[0]),
    minor: parseSplitI(split[1]),
    patch: parseSplitI(split[2]),
    pre: parseSplitI(split[3]),
  }

  return validateVersion(parsedVersion)
}

export function parsePackageVersion(pkg: Package): Version {
  return parseVersion(pkg.version)
}

export function majorVersion(version: Version): Version {
  return {
    ...version,
    major: version.major + 1,
    pre: undefined,
  }
}

export function minorVersion(version: Version): Version {
  return {
    ...version,
    minor: version.minor + 1,
    pre: undefined,
  }
}

export function patchVersion(version: Version): Version {
  return {
    ...version,
    patch: version.patch + 1,
    pre: undefined,
  }
}

export function preVersion(version: Version): Version {
  return {
    ...version,
    pre: isNaN(version.pre) ? 0 : version.pre + 1,
  }
}

export function releaseVersion(version: Version): Version {
  return {
    ...version,
    pre: undefined,
  }
}

export function validateVersion(version: Version): Version | undefined {
  return version.major !== undefined &&
    version.minor !== undefined &&
    version.patch !== undefined
    ? version
    : undefined
}
