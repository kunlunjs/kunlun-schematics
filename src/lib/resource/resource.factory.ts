import { join, Path, strings } from '@angular-devkit/core'
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  template,
  url,
  Tree,
  branchAndMerge
} from '@angular-devkit/schematics'
import { Location, NameParser } from '../../utils/name.parser'
import { mergeSourceRoot } from '../../utils/source-root.helpers'
import { ResourceOptions } from './resource.schema'
import { classify } from '@angular-devkit/core/src/utils/strings'
import * as pluralize from 'pluralize'
import { ModuleFinder, ModuleDeclarator, DeclarationOptions } from '../..'
import {
  addPackageJsonDependency,
  getPackageJsonDependency,
  NodeDependencyType
} from '../../utils/dependencies.utils'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'

const TS_TYPE_MAPPING = {
  'String': 'string',
  'Boolean': 'boolean',
  'Int': 'number' ,
  'BigInt': 'number' ,
  'Float': 'number' ,
  'Decimal': 'number' ,
  'DateTime': 'Date',
  'Json': 'JSON'
}

const GQL_TYPE_MAPPING = {
  'String': 'String',
  'Boolean': 'Boolean',
  'Int': 'Int' ,
  'BigInt': 'Int' ,
  'Float': 'Float' ,
  'Decimal': 'Float' ,
  'DateTime': 'Date',
  'Json': 'JSON'
}

export function main(options: ResourceOptions): Rule {
  options = transform(options)

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        addMappedTypesDependencyIfApplies(options),
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options))
      ])
    )(tree, context)
  }
}

function transform(options: ResourceOptions): ResourceOptions {
  const target: ResourceOptions = Object.assign({}, options)
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.')
  }
  target.metadata = 'imports'

  const location: Location = new NameParser().parse(target)
  target.name = strings.dasherize(location.name)
  target.path = strings.dasherize(location.path)

  target.path = target.flat
    ? target.path
    : join(target.path as Path, 'modules', target.name)
  target.isSwaggerInstalled = options.isSwaggerInstalled ?? false

  target.fields = parseFields(target.fields_str)
  target.fields.map( x => {
    x.tsType = TS_TYPE_MAPPING[x.type]
    x.gqlType = GQL_TYPE_MAPPING[x.type]
    return x
  })

  const importTypes = [...new Set(target.fields.map(f => f.gqlType))].filter(
    val => ['Float', 'Int'].includes(val)
  )
  if (importTypes.length !== 0) {
    target.importTypes = `, ${importTypes.join(', ')}`
  }

  return target
}

function parseFields(str: string) {
  return JSON.parse(str)
}

function generate(options: ResourceOptions): Source {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      filter(path => {
        if (path.endsWith('.dto.ts')) {
          return (
            options.type !== 'graphql-code-first' &&
            options.crud
          )
        }
        if (path.endsWith('.input.ts')) {
          return (
            options.type === 'graphql-code-first' &&
            options.crud
          )
        }
        if (
          path.endsWith('.resolver.ts') ||
          path.endsWith('.resolver.spec.ts')
        ) {
          return (
            options.type === 'graphql-code-first'
          )
        }
        if (
          path.endsWith('controller.ts') ||
          path.endsWith('.controller.spec.ts')
        ) {
          return options.type === 'rest'
        }
        if (path.includes('@ent')) {
          // Entity class file workaround
          // When an invalid glob path for entities has been specified (on the application part)
          // TypeORM was trying to load a template class
          return options.crud
        }
        return true
      }),
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
        lowercased: (name: string) => {
          const classifiedName = classify(name)
          return (
            classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1)
          )
        },
        singular: (name: string) => pluralize.singular(name),
        ent: (name: string) => name + '.entity'
      }),
      move(options.path)
    ])(context)
}

function addDeclarationToModule(options: ResourceOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path
    })
    if (!options.module) {
      return tree
    }
    const content = tree.read(options.module).toString()
    const declarator: ModuleDeclarator = new ModuleDeclarator()
    tree.overwrite(
      options.module,
      declarator.declare(content, {
        ...options,
        type: 'module'
      } as DeclarationOptions)
    )
    return tree
  }
}

function addMappedTypesDependencyIfApplies(options: ResourceOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      if (options.type === 'graphql-code-first') {
        return
      }
      if (options.type === 'rest') {
        const nodeDependencyRef = getPackageJsonDependency(
          host,
          '@nestjs/swagger'
        )
        if (nodeDependencyRef) {
          options.isSwaggerInstalled = true
          return
        }
      }
      const nodeDependencyRef = getPackageJsonDependency(
        host,
        '@nestjs/mapped-types'
      )
      if (!nodeDependencyRef) {
        addPackageJsonDependency(host, {
          type: NodeDependencyType.Default,
          name: '@nestjs/mapped-types',
          version: '*'
        })
        context.addTask(new NodePackageInstallTask())
      }
    } catch (err) {
      // ignore if "package.json" not found
    }
  }
}
