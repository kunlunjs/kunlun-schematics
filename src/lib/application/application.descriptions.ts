import type { Path } from '@angular-devkit/core'
import { join } from '@angular-devkit/core'
import type { SchematicContext, Tree } from '@angular-devkit/schematics'

export const allConfigurations = [
  'a2s',
  'browserslist',
  'commitlint',
  'docker',
  'editorconfig',
  'git',
  'husky',
  'lintstaged',
  'prettier',
  'stylelint'
] as const

export type ConfigurationKeys = typeof allConfigurations[number]

export interface DescriptionConfig {
  combinations?: string[]
  configurationsOmit?: ConfigurationKeys[]
  configurations?: ConfigurationKeys[]
}

export function updateTreeWithConfigurations(
  name: string,
  tree: Tree,
  context: SchematicContext
): Tree {
  const descriptionFile = join(name as Path, 'descriptions.json')
  let description: DescriptionConfig
  try {
    description = JSON.parse(tree.read(descriptionFile).toString())
  } catch (error) {
    //
  }
  if (description) {
    // 组合
    if (description.combinations) {
      //
    }
    // 配置文件
    let configurations: ConfigurationKeys[] = []
    if (description.configurations) {
      configurations = description.configurations
    } else if (description.configurationsOmit) {
      configurations = allConfigurations.filter(
        configuration => !description.configurationsOmit.includes(configuration)
      )
    }
    if (configurations.length) {
      if (configurations.includes('a2s')) {
        //
      }
      if (configurations.includes('browserslist')) {
        //
      }
      if (configurations.includes('commitlint')) {
        //
      }
      if (configurations.includes('docker')) {
        //
      }
      if (configurations.includes('editorconfig')) {
        //
      }
      if (configurations.includes('git')) {
        //
      }
      if (configurations.includes('husky')) {
        //
      }
      if (configurations.includes('lintstaged')) {
        //
      }
      if (configurations.includes('prettier')) {
        //
      }
      if (configurations.includes('stylelint')) {
        //
      }
    }
  }
  if (tree.exists(descriptionFile)) {
    tree.delete(descriptionFile)
  }
  return tree
}
