function stringify(pkgVersion) {
  return `${pkgVersion.major}.${pkgVersion.minor}.${pkgVersion.patch}${
    pkgVersion.pre !== undefined ? '-' + pkgVersion.pre : ''
  }`
}

function parseVersion(version) {
  if (!version) return {}

  const split = version.split('.')

  const minor = split[2]

  const minorSplit = minor.split('-')

  if (minorSplit.length > 1) {
    split[2] = minorSplit[0]
    split[3] = minorSplit[1]
  }

  const parseSplitI = (num) =>
    isNaN(parseInt(num)) ? undefined : parseInt(num)

  const parsedVersion = {
    major: parseSplitI(split[0]),
    minor: parseSplitI(split[1]),
    patch: parseSplitI(split[2]),
    pre: parseSplitI(split[3]),
  }

  return validateVersion(parsedVersion)
}

function parsePackageVersion(pkg) {
  return parseVersion(pkg.version)
}

function majorVersion(pkgVersion) {
  return {
    ...pkgVersion,
    major: pkgVersion.major + 1,
    pre: undefined,
  }
}

function minorVersion(pkgVersion) {
  return {
    ...pkgVersion,
    minor: pkgVersion.minor + 1,
    pre: undefined,
  }
}

function patchVersion(pkgVersion) {
  return {
    ...pkgVersion,
    patch: pkgVersion.patch + 1,
    pre: undefined,
  }
}

function preVersion(pkgVersion) {
  return {
    ...pkgVersion,
    pre: isNaN(pkgVersion.pre) ? 0 : pkgVersion.pre + 1,
  }
}

function releaseVersion(pkgVersion) {
  return {
    ...pkgVersion,
    pre: undefined,
  }
}

function validateVersion(version) {
  return version.major !== undefined &&
    version.minor !== undefined &&
    version.patch !== undefined
    ? version
    : undefined
}

export const Version = {
  stringify,
  parsePackageVersion,
  majorVersion,
  minorVersion,
  patchVersion,
  preVersion,
  releaseVersion,
  parseVersion,
  validateVersion,
}
