export interface Args {
  commands: any[]
  type?: string
}

export interface Version {
  major: number
  minor: number
  patch: number
  pre?: number
}

export interface Package {
  version: string
}

export interface Release {
  version: string
  date: string
  added: string[]
  changed: string[]
  fixed: string[]
}

export interface Changelog {
  releases: Release[]
}

export interface Data {
  day: number
  month: number
  year: number
}

export interface CommandHelp {
  arg: string
  message: string
}

export enum VersionTypes {
  MAJOR = 'major',
  MINOR = 'minor',
  PATCH = 'patch',
  PREMAJOR = 'premajor',
  PREMINOR = 'preminor',
  PREPATCH = 'prepatch',
  PRERELEASE = 'prerelease',
  RELEASE = 'release',
  NIGHTLY = 'nightly',
}
