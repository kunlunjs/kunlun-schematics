import { basename, parse } from 'path'
import type { Path } from '@angular-devkit/core'
import { join, strings } from '@angular-devkit/core'
import type { Rule, Source } from '@angular-devkit/schematics'
import {
  apply,
  mergeWith,
  move,
  template,
  url
} from '@angular-devkit/schematics'
import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_VERSION
} from '../defaults'
import type { ApplicationOptions } from './application.schema'

export function main(options?: ApplicationOptions): Rule {
  options.name = strings.decamelize(options.name)

  const path =
    !options.directory || options.directory === 'undefined'
      ? options.name
      : options.directory

  options = transform(options)
  return mergeWith(generate(options, path))
}

function transform(options: ApplicationOptions): ApplicationOptions {
  const target: ApplicationOptions = Object.assign({}, options)

  target.author = !!target.author ? target.author : DEFAULT_AUTHOR
  target.description = !!target.description
    ? target.description
    : DEFAULT_DESCRIPTION
  // target.language = !!target.language ? target.language : DEFAULT_LANGUAGE
  target.name = resolvePackageName(target.name)
  target.type = !!target.type ? target.type : 'React'
  target.version = !target.version ? target.version : DEFAULT_VERSION

  target.packageManager =
    !target.packageManager || target.packageManager !== 'undefined'
      ? 'npm'
      : target.packageManager
  target.dependencies = !!target.dependencies ? target.dependencies : ''
  target.devDependencies = !!target.devDependencies
    ? target.devDependencies
    : ''
  return target
}

function resolvePackageName(path: string) {
  const { name } = parse(path)
  if (name === '.') {
    return basename(process.cwd())
  }
  return name
}

function generate(options: ApplicationOptions, path: string): Source {
  return apply(url(join('./files' as Path, options.type)), [
    template({
      ...strings,
      ...options
    }),
    move(path)
  ])
}
