import * as path from 'path'
import type { UnitTestTree } from '@angular-devkit/schematics/testing'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import type { ApplicationOptions } from './application.schema'

describe('Application Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json')
  )

  it('should manage name only', async () => {
    const options: ApplicationOptions = {
      name: 'project'
    }
    const tree: UnitTestTree = await runner
      .runSchematicAsync('application', options)
      .toPromise()
    const files: string[] = tree.files
    expect(files).toEqual([
      '/project/.commitlintrc.js',
      '/project/.editorconfig',
      '/project/.eslintignore',
      '/project/.eslintrc.cjs',
      '/project/.gitignore',
      '/project/.lintstagedrc.js',
      '/project/.prettierignore',
      '/project/.prettierrc.js',
      '/project/README.md',
      '/project/kunlun.config.ts',
      '/project/package.json',
      '/project/tsconfig.build.json',
      '/project/tsconfig.json',
      '/project/.husky/commit-msg',
      '/project/.husky/pre-commit',
      '/project/.husky/prepare-commit-msg',
      '/project/scripts/verify-commit-msg.ts',
      '/project/src/index.tsx'
    ])
  })

  it('should mange name to dasherize', async () => {
    const options: ApplicationOptions = {
      name: 'awesomeProject'
    }
    const tree: UnitTestTree = await runner
      .runSchematicAsync('application', options)
      .toPromise()
    const files: string[] = tree.files
    expect(files).toEqual([
      '/awesome_project/.commitlintrc.js',
      '/awesome_project/.editorconfig',
      '/awesome_project/.eslintignore',
      '/awesome_project/.eslintrc.cjs',
      '/awesome_project/.gitignore',
      '/awesome_project/.lintstagedrc.js',
      '/awesome_project/.prettierignore',
      '/awesome_project/.prettierrc.js',
      '/awesome_project/README.md',
      '/awesome_project/kunlun.config.ts',
      '/awesome_project/package.json',
      '/awesome_project/tsconfig.build.json',
      '/awesome_project/tsconfig.json',
      '/awesome_project/.husky/commit-msg',
      '/awesome_project/.husky/pre-commit',
      '/awesome_project/.husky/prepare-commit-msg',
      '/awesome_project/scripts/verify-commit-msg.ts',
      '/awesome_project/src/index.tsx'
    ])
  })

  it('should manage destination directory', async () => {
    const options: ApplicationOptions = {
      name: '@scope/package',
      directory: 'scope-package'
    }
    const tree: UnitTestTree = await runner
      .runSchematicAsync('application', options)
      .toPromise()
    const files: string[] = tree.files
    expect(files).toEqual([
      '/scope-package/.commitlintrc.js',
      '/scope-package/.editorconfig',
      '/scope-package/.eslintignore',
      '/scope-package/.eslintrc.cjs',
      '/scope-package/.gitignore',
      '/scope-package/.lintstagedrc.js',
      '/scope-package/.prettierignore',
      '/scope-package/.prettierrc.js',
      '/scope-package/README.md',
      '/scope-package/kunlun.config.ts',
      '/scope-package/package.json',
      '/scope-package/tsconfig.build.json',
      '/scope-package/tsconfig.json',
      '/scope-package/.husky/commit-msg',
      '/scope-package/.husky/pre-commit',
      '/scope-package/.husky/prepare-commit-msg',
      '/scope-package/scripts/verify-commit-msg.ts',
      '/scope-package/src/index.tsx'
    ])
  })
})
