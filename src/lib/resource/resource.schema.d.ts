import { Path } from '@angular-devkit/core'
import exp = require('constants')

export interface Field_T {
  /**
   * 字段名
   */
  name: string
  /**
   * 字段标题
   */
  title: string
  /**
   * 描述
   */
  description?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 是否是主键
   */
  isPrimaryKey?: boolean
  /**
   * 主键策略
   */
  primaryKeyStrategy?: 'autoincrement' | 'cuid' | 'uuid'
  /**
   * 类型
   */
  type:
    | 'String'
    | 'Boolean'
    | 'Int'
    | 'BigInt'
    | 'Float'
    | 'Decimal'
    | 'DateTime'
    | 'Json'
    | 'Bytes'
  /**
   * 是否是数组
   */
  isArray?: boolean
  /**
   * 原始数据类型
   */
  primitiveType?: string
  /**
   * 是否唯一
   */
  unique?: boolean
  /**
   * 是否可 null
   */
  nullable?: boolean
  /**
   * 默认值
   */
  defaultValue?: string | number | boolean | null | object | Array<any>
  /**
   * 小数点
   */
  decimal?: number
  /**
   * 长度
   */
  length?: number

  tsType?: string
  gqlType?: string
}

export interface ResourceOptions {
  /**
   * The name of the resource.
   */
  name: string
  /**
   * The path to create the resource.
   */
  path?: string | Path
  /**
   * The source root path
   */
  sourceRoot?: string
  /**
   * Specifies if spec files are generated.
   */
  spec?: boolean
  /**
   * The path to insert the module declaration.
   */
  module?: Path
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean
  /**
   * The transport layer.
   */
  type?: 'rest' | 'graphql-code-first'
  /**
   * When true, CRUD entry points are generated.
   */
  crud?: boolean
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean
  /**
   * When true, "@nestjs/swagger" dependency is installed in the project.
   */
  isSwaggerInstalled?: boolean
  /**
   * Entity fields
   */
  fields?: Field_T[]
  importTypes?: string
}
