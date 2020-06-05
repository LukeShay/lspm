export interface Args {
  commands: any[]
  custom?: string
  major?: boolean
  minor?: boolean
  patch?: boolean
  premajor?: boolean
  preminor?: boolean
  prepatch?: boolean
  prerelease?: boolean
  release?: boolean
  nightly?: boolean
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
