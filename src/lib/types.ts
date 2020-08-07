export type Args = {
  commands: any[]
  type?: string
}

export type Version = {
  major: number
  minor: number
  patch: number
  pre?: number
}

export type Package = {
  version: string
}

export type Release = {
  version: string
  date: string
  added: string[]
  changed: string[]
  fixed: string[]
}

export type Changelog = {
  releases: Release[]
}

export type Data = {
  day: number
  month: number
  year: number
}

export type CommandHelp = {
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
