# Luke Shay Package Manager

- [Luke Shay Package Manager](#luke-shay-package-manager)
- [Introducion](#introducion)
- [Commands](#commands)
  - [version](#version)
    - [Usage](#usage)
    - [Flags](#flags)

# Introducion

[![npm version](https://badge.fury.io/js/%40lukeshay%2Flspm.svg)](https://badge.fury.io/js/%40lukeshay%2Flspm)

This program is a CLI tool that can be used to manage your NPM package. There are a few useful commands that make the creation of a changelog and version handling substantially easier than the standard way of doing it. This document will describe the commands and how they can be used. Please note, any version with `-n` where `n` is a number is a nightly build which is considered experiemental. Therefore those builds may have bugs and we do not recommend using them unless you have a reason to.

# Commands

## version

This command is used the same as `npm version`, but with a couple extra flags.

### Usage

`lspm version < --major | --minor | --patch | --premajor | --preminor | --prepatch | --prerelease | --nightly | --custom 'x.x.x' >`

### Flags

| Flag | Description | Example |
|-|-|-|
| --major | Bumps the major version found in `package.json` | v0.0.1 -> v1.0.0 |
| --minor | Bumps the minor version found in `package.json` | v0.0.1 -> v0.1.0 |
| --patch | Bumps the patch version found in `package.json` | v0.0.1 -> v0.0.2 |
| --premajor | Bumps the major version found in `package.json` and adds pre-release version | v0.0.1 -> v1.0.0-0 |
| --preminor | Bumps the minor version found in `package.json` and adds pre-release version | v0.0.1 -> v0.1.0-0 |
| --prepatch | Bumps the patch version found in `package.json` and adds pre-release version | v0.0.1 -> v0.0.2-0 |
| --nightly | Bumps the pre-release version if there is one found in `package.json` or does a pre-patch version bump | v0.0.1 -> v0.0.2-0 \| v0.0.1-0 -> v0.0.1-1 |
| --custom | Sets the version in `package.json` to what you passed in |
