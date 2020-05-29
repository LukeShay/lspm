async function stringify(pkgVersion) {
  return `${pkgVersion.major}.${pkgVersion.minor}.${pkgVersion.patch}${
    pkgVersion.pre !== undefined ? '-' + pkgVersion.pre : ''
  }`
}

async function parsePackageVersion(pkg) {
  const split = pkg.version.split('.')

  const minor = split[2]

  const minorSplit = minor.split('-')

  if (minorSplit.length > 1) {
    split[2] = minorSplit[0]
    split[3] = minorSplit[1]
  }

  return {
    major: parseInt(split[0]),
    minor: parseInt(split[1]),
    patch: parseInt(split[2]),
    pre: isNaN(parseInt(split[3])) ? undefined : parseInt(split[3]),
  }
}

async function majorVersion(pkgVersion) {
  return {
    ...pkgVersion,
    major: pkgVersion.major + 1,
    pre: undefined,
  }
}

async function minorVersion(pkgVersion) {
  return {
    ...pkgVersion,
    minor: pkgVersion.minor + 1,
    pre: undefined,
  }
}

async function patchVersion(pkgVersion) {
  return {
    ...pkgVersion,
    patch: pkgVersion.patch + 1,
    pre: undefined,
  }
}

async function preVersion(pkgVersion) {
  return {
    ...pkgVersion,
    pre: isNaN(pkgVersion.pre) ? 0 : pkgVersion.pre + 1,
  }
}

export const Version = {
  stringify,
  parsePackageVersion,
  majorVersion,
  minorVersion,
  patchVersion,
  preVersion,
}
