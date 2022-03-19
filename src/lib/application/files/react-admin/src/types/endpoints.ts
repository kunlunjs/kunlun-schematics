export const schemaModels = [
  'ArticleModel',
  'ArticleCategoryModel',
  'ArticleTagModel',
  'UserModel',
  'ProfileModel',
  'OrganizationModel',
  'ColumnModel',
  'DataCategoryModel',
  'DataTagModel',
  'DataModel',
  'AdminModel',
  'RoleModel',
  'PermissionModel',
  'DictionaryModel',
  'ConfigModel',
  'FileModel',
  'RouteModel',
  'ComponentModel',
  'TemplateModel',
  'ApplicationModel',
  'ApplicationVersionModel',
  'PageModel',
  'PageHistoryModel',
  'IconModel',
  'RequestLogModel',
  'VisitStatsModel',
  'SurveyModel',
  'QuestionModel',
  'ChoiceModel',
  'AnswerModel',
  'AnswerChoiceModel',
  'FeedbackModel',
  'QACategoryModel',
  'QAModel',
  'OpinionCollectionModel',
  'ParkModel',
  'CarrierPlatformTypeModel',
  'CarrierPlatformModel',
  'TableFieldModel',
  'TableModel'
] as const

export type SchemaModels = typeof schemaModels[number]

export const schemaGeneratedModelTags = [
  '内容管理',
  '内容分类管理',
  '内容标签管理',
  '用户管理',
  '个人资料管理',
  '组织管理',
  '栏目管理',
  '数据分类管理',
  '数据标签管理',
  '数据管理',
  '管理员管理',
  '角色管理',
  '权限管理',
  '字典管理',
  '配置管理',
  '文件管理',
  '路由/菜单管理',
  '组件管理',
  '模板管理',
  '应用管理',
  '应用版本管理',
  '页面管理',
  '页面历史记录管理',
  '图标管理',
  '请求日志管理',
  '访问统计数据管理',
  '调查问卷管理',
  '调查问卷-问题管理',
  '调查问卷-选项管理',
  '调查问卷-答卷管理',
  '调查问卷-答卷选项管理',
  '留言管理',
  '常见问题分类管理',
  '常见问题管理',
  '意见收集管理',
  '园区管理',
  '载体平台类型管理',
  '载体平台管理',
  '表字段管理',
  '数据表管理'
] as const

export type SchemaGeneratedModelTags = typeof schemaGeneratedModelTags[number]

export const schemaGeneratedModels = [
  'articleModel',
  'articleCategoryModel',
  'articleTagModel',
  'userModel',
  'profileModel',
  'organizationModel',
  'columnModel',
  'dataCategoryModel',
  'dataTagModel',
  'dataModel',
  'adminModel',
  'roleModel',
  'permissionModel',
  'dictionaryModel',
  'configModel',
  'fileModel',
  'routeModel',
  'componentModel',
  'templateModel',
  'applicationModel',
  'applicationVersionModel',
  'pageModel',
  'pageHistoryModel',
  'iconModel',
  'requestLogModel',
  'visitStatsModel',
  'surveyModel',
  'questionModel',
  'choiceModel',
  'answerModel',
  'answerChoiceModel',
  'feedbackModel',
  'qACategoryModel',
  'qAModel',
  'opinionCollectionModel',
  'parkModel',
  'carrierPlatformTypeModel',
  'carrierPlatformModel',
  'tableFieldModel',
  'tableModel'
] as const

export type SchemaGeneratedModels = typeof schemaGeneratedModels[number]

export const interfaces = [
  '获取内容列表',
  '获取内容详情',
  '添加内容',
  '更新内容',
  '删除内容',
  '获取内容分类列表',
  '获取内容分类详情',
  '添加内容分类',
  '更新内容分类',
  '删除内容分类',
  '获取内容标签列表',
  '获取内容标签详情',
  '添加内容标签',
  '更新内容标签',
  '删除内容标签',
  '获取用户列表',
  '获取用户详情',
  '添加用户',
  '更新用户',
  '删除用户',
  '获取个人资料列表',
  '获取个人资料详情',
  '添加个人资料',
  '更新个人资料',
  '删除个人资料',
  '获取组织列表',
  '获取组织详情',
  '添加组织',
  '更新组织',
  '删除组织',
  '获取栏目列表',
  '获取栏目详情',
  '添加栏目',
  '更新栏目',
  '删除栏目',
  '获取数据分类列表',
  '获取数据分类详情',
  '添加数据分类',
  '更新数据分类',
  '删除数据分类',
  '获取数据标签列表',
  '获取数据标签详情',
  '添加数据标签',
  '更新数据标签',
  '删除数据标签',
  '获取数据列表',
  '获取数据详情',
  '添加数据',
  '更新数据',
  '删除数据',
  '获取管理员列表',
  '获取管理员详情',
  '添加管理员',
  '更新管理员',
  '删除管理员',
  '获取角色列表',
  '获取角色详情',
  '添加角色',
  '更新角色',
  '删除角色',
  '获取权限列表',
  '获取权限详情',
  '添加权限',
  '更新权限',
  '删除权限',
  '获取字典列表',
  '获取字典详情',
  '添加字典',
  '更新字典',
  '删除字典',
  '获取配置列表',
  '获取配置详情',
  '添加配置',
  '更新配置',
  '删除配置',
  '获取文件列表',
  '获取文件详情',
  '添加文件',
  '更新文件',
  '删除文件',
  '获取路由/菜单列表',
  '获取路由/菜单详情',
  '添加路由/菜单',
  '更新路由/菜单',
  '删除路由/菜单',
  '获取组件列表',
  '获取组件详情',
  '添加组件',
  '更新组件',
  '删除组件',
  '获取模板列表',
  '获取模板详情',
  '添加模板',
  '更新模板',
  '删除模板',
  '获取应用列表',
  '获取应用详情',
  '添加应用',
  '更新应用',
  '删除应用',
  '获取应用版本列表',
  '获取应用版本详情',
  '添加应用版本',
  '更新应用版本',
  '删除应用版本',
  '获取页面列表',
  '获取页面详情',
  '添加页面',
  '更新页面',
  '删除页面',
  '获取页面历史记录列表',
  '获取页面历史记录详情',
  '添加页面历史记录',
  '更新页面历史记录',
  '删除页面历史记录',
  '获取图标列表',
  '获取图标详情',
  '添加图标',
  '更新图标',
  '删除图标',
  '获取请求日志列表',
  '获取访问统计数据列表',
  '获取访问统计数据详情',
  '添加访问统计数据',
  '获取调查问卷列表',
  '获取调查问卷详情',
  '添加调查问卷',
  '更新调查问卷',
  '删除调查问卷',
  '获取调查问卷-问题列表',
  '获取调查问卷-问题详情',
  '添加调查问卷-问题',
  '更新调查问卷-问题',
  '删除调查问卷-问题',
  '获取调查问卷-选项列表',
  '获取调查问卷-选项详情',
  '添加调查问卷-选项',
  '更新调查问卷-选项',
  '删除调查问卷-选项',
  '获取调查问卷-答卷列表',
  '获取调查问卷-答卷详情',
  '添加调查问卷-答卷',
  '更新调查问卷-答卷',
  '删除调查问卷-答卷',
  '获取调查问卷-答卷选项列表',
  '获取调查问卷-答卷选项详情',
  '添加调查问卷-答卷选项',
  '更新调查问卷-答卷选项',
  '删除调查问卷-答卷选项',
  '获取留言列表',
  '获取留言详情',
  '添加留言',
  '更新留言',
  '删除留言',
  '获取常见问题分类列表',
  '获取常见问题分类详情',
  '添加常见问题分类',
  '更新常见问题分类',
  '删除常见问题分类',
  '获取常见问题列表',
  '获取常见问题详情',
  '添加常见问题',
  '更新常见问题',
  '删除常见问题',
  '获取意见收集列表',
  '获取意见收集详情',
  '添加意见收集',
  '更新意见收集',
  '删除意见收集',
  '获取园区列表',
  '获取园区详情',
  '添加园区',
  '更新园区',
  '删除园区',
  '获取载体平台类型列表',
  '获取载体平台类型详情',
  '添加载体平台类型',
  '更新载体平台类型',
  '删除载体平台类型',
  '获取载体平台列表',
  '获取载体平台详情',
  '添加载体平台',
  '更新载体平台',
  '删除载体平台',
  '获取表字段列表',
  '获取表字段详情',
  '添加表字段',
  '更新表字段',
  '删除表字段',
  '获取数据表列表',
  '获取数据表详情',
  '添加数据表',
  '更新数据表',
  '删除数据表'
] as const

export type Interfaces = typeof interfaces[number]

export const schemaGeneratedModelMethods = [
  'findUnique',
  'findMany',
  'create',
  'update'
  // createMany
  // delete,
  // deleteMany,
  // 'updateMany'
] as const

export type SchemaGeneratedModelMethods =
  typeof schemaGeneratedModelMethods[number]

export type DMMFField = {
  name: string
  title?: string
  kind: 'scalar' | 'object' | 'enum' | 'unsupported' | 'relation-input' | string
  type: 'Int' | 'String' | 'Boolean' | 'Json' | 'Float' | 'DateTime' | string
  default?:
    | string
    | number
    | boolean
    | {
        name: 'now' | 'autoincrement'
        args: string[]
      }
  isId: boolean
  isList: boolean
  isUnique: boolean
  isRequired: boolean
  isNullable?: boolean
  isReadOnly?: boolean
  isUpdatedAt: boolean
  isCreatedAt?: boolean
  isDeletedAt?: boolean
  isGenerated?: boolean
  relationName?: string
  documentation?: string
  hasDefaultValue?: boolean
  relationToFields?: string[]
  relationFromFields?: string[]
  options?: string[] | { label: string; value: string }[]
  isFile?: boolean
  isIcon?: boolean
  isJson?: boolean
  isEnum?: boolean
  isImage?: boolean
  isFloat?: boolean
  isColor?: boolean
  isHidden?: boolean
  isAvatar?: boolean
  isBoolean?: boolean
  isInteger?: boolean
  isRichText?: boolean
  isPassword?: boolean
  isDateTime?: boolean
  isTextArea?: boolean
  isSelectFalse?: boolean
  isSystemPreset?: boolean
  isPrimitiveList?: boolean
  isIntPrimitiveList?: boolean
  isFloatPrimitiveList?: boolean
  isStringPrimitiveList?: boolean
  isBooleanPrimitiveList?: boolean
  // 是否关系键
  isRelationField?: boolean
  // 作为哪个相邻关系的主键
  asPrimaryKeyOfForeignKey?: string
  // 指向关系键的主键
  relationToOtherModelPrimaryKey?: string
  // 作为哪个父关系的主键
  asPrimaryKeyOfParent?: string
  isNested?: boolean
  isParentField?: boolean
  isChildrenField?: boolean
  queryRelationFieldType?: string[] | string
  addOrUpdateRelationFieldType?: number[] | number
  serviceName?: string
  showFieldName?: string
  showFieldTitle?: string
  labelNames?: { label: string; value: string; children: string }
  isQueryFormHidden?: boolean
  isRequiredConfirm?: boolean
  isCreateOrUpdateFormHidden?: boolean
  width?: number
  tooltip?: string
  visibleIf?: {
    name: string
    value: string | number | boolean
  }
  // [key: string]: any
}

export type InterfaceType = 'add' | 'update' | 'list' | 'detail' | 'delete'

export type SchemaModelByName = {
  name: SchemaModels
  dbName: string | null
  tag: string
  fieldsName: string[]
  comment: SchemaGeneratedModelTags
  fieldsByName: Record<string, DMMFField>
  interfaces: { [K in InterfaceType]?: string }
  isGenerated: false
  isNested?: boolean
  documentation?: string
  primaryKey: string | null
  isNestedModel?: boolean
  inputUniqueFields: string[]
  uniqueFields: string[] | string[][]
  uniqueIndexes: string[] | { name: string | null; fields: string[] }[]
}

export type ModelsByName = {
  [K in SchemaModels]?: SchemaModelByName
}

export const enumNames = [
  'EArticleType',
  'EArticleStatus',
  'EApprovalStatus',
  'EToolType',
  'ECommentType',
  'EGender',
  'EColumnContentType',
  'EAdminStatus',
  'EDictionaryType',
  'EConfigType',
  'EConfigValueFormat',
  'ERoutePostion',
  'EComponentLevel',
  'EComponentSource',
  'EComponentType',
  'EMethod',
  'ERequestPlatform',
  'EQuestionType',
  'ECarrierPlatformLevel',
  'EDefaultValueStrategy',
  'EFieldType',
  'ENativeDatabaseType',
  'EFieldValueType',
  'EDatabaseType',
  'ENestMappingRelation',
  'EDatabaseStatus'
] as const

export type EnumNames = typeof enumNames[number]

export type EnumsByName = {
  [K in EnumNames]?: {
    name: EnumNames
    options: (
      | {
          label: string
          value: string
        }
      | string
    )[]
    labelsByValue: Record<string, string>
  }
}
