export const databaseTypes = [
  {
    label: 'MySQL',
    value: 'MySQL',
    disabled: true
  },
  {
    label: 'MongoDB',
    value: 'MongoDB',
    disabled: true
  },
  {
    label: 'PostgreSQL',
    value: 'PostgreSQL'
  }
]

export const nestMappingRelations = [
  {
    label: '1对1',
    value: 'OneToOne'
  },
  {
    label: '1对多',
    value: 'OneToMany'
  },
  {
    label: '多对多',
    value: 'ManyToMany'
  }
]

export const databaseStatus = [
  {
    label: '开发中',
    value: 'Doing'
  },
  {
    label: '完成',
    value: 'Done'
  },
  {
    label: '禁用',
    value: 'Disabled'
  }
]

export const primaryKeyStrategies = [
  // {
  //   label: 'now',
  //   value: 'now'
  // },
  {
    label: 'cuid',
    value: 'cuid'
  },
  {
    label: 'uuid',
    value: 'uuid'
  },
  {
    label: 'dbgenerated',
    value: 'dbgenerated'
  },
  {
    label: 'autoincrement',
    value: 'autoincrement'
  }
]

export const fieldTypes = [
  {
    label: 'Int',
    value: 'Int'
  },
  {
    label: 'Json',
    value: 'Json'
  },
  {
    label: 'Bytes',
    value: 'Bytes'
  },
  {
    label: 'Float',
    value: 'Float'
  },
  {
    label: 'BigInt',
    value: 'BigInt'
  },
  {
    label: 'String',
    value: 'String'
  },
  {
    label: 'Boolean',
    value: 'Boolean'
  },
  {
    label: 'Decimal',
    value: 'Decimal'
  },
  {
    label: 'DateTime',
    value: 'DateTime'
  }
  // {
  //   label: 'Unsupported',
  //   value: 'Unsupported'
  // }
]

export const nativeDatabaseTypes = [
  {
    label: '@db.Xml',
    value: '@db.Xml'
  },
  {
    label: '@db.Inet',
    value: '@db.Inet'
  },
  {
    label: '@db.Uuid',
    value: '@db.Uuid'
  },
  {
    label: '@db.Text',
    value: '@db.Text'
  },
  {
    label: '@db.Bit(x)',
    value: '@db.Bit(x)'
  },
  {
    label: '@db.VarBit',
    value: '@db.VarBit'
  },
  {
    label: '@db.Citext',
    value: '@db.Citext'
  },
  {
    label: '@db.Char(x)',
    value: '@db.Char(x)'
  },
  {
    label: '@db.VarChar(n)',
    value: '@db.VarChar(n)'
  }
]

export const fieldValueTypes = [
  {
    label: '整数',
    value: 'isInteger'
  },
  {
    label: '小数',
    value: 'isFloat'
  },
  {
    label: '链接',
    value: 'isUrl'
  },
  {
    label: '文件',
    value: 'isFile'
  },
  {
    label: '图标',
    value: 'isIcon'
  },
  {
    label: '图片',
    value: 'isImage'
  },
  {
    label: '颜色',
    value: 'isColor'
  },
  {
    label: '图表',
    value: 'isChart'
  },
  {
    label: '开关',
    value: 'isSwitch'
  },
  {
    label: '按钮',
    value: 'isButton'
  },
  {
    label: '徽标',
    value: 'isBadge'
  },
  {
    label: '代码',
    value: 'isCode'
  },
  {
    label: 'JSON',
    value: 'isJSON'
  },
  {
    label: '进度条',
    value: 'isProgress'
  },
  {
    label: '输入框',
    value: 'isInput'
  },
  {
    label: '单选框',
    value: 'isRadio'
  },
  {
    label: '复选框',
    value: 'isCheckbox'
  },
  {
    label: '富文本',
    value: 'isRichText'
  },
  {
    label: '多行文本',
    value: 'isTextArea'
  },
  {
    label: '时间日期',
    value: 'isDateTime'
  }
]

export const validators: { label: string; value: string }[] = []
export const relationTables: { label: string; value: string }[] = []
export const mocks: { label: string; value: string }[] = []
export const transforms: { label: string; value: string }[] = [
  {
    label: '加密',
    value: 'bcrypt'
  }
]
export const generateInterfaces: { label: string; value: string }[] = [
  {
    label: '查询列表',
    value: 'query'
  },
  {
    label: '详情',
    value: 'detail'
  },
  {
    label: '创建',
    value: 'create'
  },
  {
    label: '更新',
    value: 'update'
  },
  {
    label: '删除',
    value: 'delete'
  },
  {
    label: '导入',
    value: 'import'
  },
  {
    label: '导出',
    value: 'export'
  },
  {
    label: '批量删除',
    value: 'deleteMany'
  }
]
