export interface ApplicationOptions {
  /**
   * Kunlun application name.
   */
  name: string
  /**
   * Kunlun Application type: react | vue | nest-prisma-restful | nest-prisma-graphql
   */
  type?: string
  /**
   * Kunlun application author.
   */
  author?: string
  /**
   * Kunlun application description.
   */
  description?: string
  /**
   * Kunlun application destination directory.
   */
  directory?: string
  /**
   * With TypeScript strict mode.
   */
  strict?: boolean
  /**
   * Kunlun application version.
   */
  version?: string
  /**
   * Application language.
   */
  language?: string
  /**
   * The used package manager.
   */
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'undefined'
  /**
   * Kunlun included production dependencies (comma separated values).
   */
  dependencies?: string
  /**
   * Kunlun included development dependencies (comma separated values).
   */
  devDependencies?: string
}
