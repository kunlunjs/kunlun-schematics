/* eslint-disable */
export declare namespace ApiDocuments {
  export interface AdminLoginDto {
    /**
     * @description 用户名
     */
    username: string
    /**
     * @description 密码
     */
    password: string
  }
  export interface AdminVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password: string
    /**
     * @description 状态 Normal - 正常 Disabled - 禁用
     * @enum Normal,Disabled
     */
    status: string
    /**
     * @description 标签
     */
    tags: string[]
    /**
     * @description 数据
     */
    datas: string[]
    /**
     * @description 文件
     */
    files: string[]
    /**
     * @description 分类
     */
    categories: string[]
    /**
     * @description 回复的留言
     */
    feedbackReplys: string[]
    /**
     * @description 所属角色
     */
    role: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    /**
     * @description 发布的内容
     */
    articles: string[]
  }
  export interface CreateAdminDto {
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password: string
    /**
     * @description 状态 Normal - 正常 Disabled - 禁用
     * @enum Normal,Disabled
     */
    status?: string
    tags?: number[]
    datas?: number[]
    files?: number[]
    categories?: number[]
    feedbackReplys?: number[]
    roleId?: number
    role?: number
    articles?: number[]
  }
  export interface UpdateAdminDto {
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username?: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password?: string
    /**
     * @description 状态 Normal - 正常 Disabled - 禁用
     * @enum Normal,Disabled
     */
    status?: string
    tags?: number[]
    datas?: number[]
    files?: number[]
    categories?: number[]
    feedbackReplys?: number[]
    roleId?: number
    role?: number
    articles?: number[]
  }
  export interface CreateApplicationDto {
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 当前使用的主题
     */
    theme?: string
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 配置项值
     */
    globalProps?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    /**
     * @description 当前版本号
     */
    version?: string
    /**
     * @description 包含页面
     */
    pages?: string[]
    /**
     * @description 版本列表
     */
    versions?: string[]
  }
  export interface UpdateApplicationDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 当前使用的主题
     */
    theme?: string
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 配置项值
     */
    globalProps?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    /**
     * @description 当前版本号
     */
    version?: string
    /**
     * @description 包含页面
     */
    pages?: string[]
    /**
     * @description 版本列表
     */
    versions?: string[]
  }
  export interface PublishApplicationDto {
    /**
     * @description 应用ID
     */
    id: number
    /**
     * @description 版本号
     */
    version: string
    /**
     * @description 全局配置
     */
    globalProps?: {}
  }
  export interface CreateArticleDto {
    categories?: number[]
    tags?: number[]
    columns?: number[]
    /**
     * @description 类型: Original - 原创 Reprint - 转载
     * @enum Original,Reprint
     */
    type?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 标题
     */
    title: string
    /**
     * @description Banner
     */
    banner?: string
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否首页展示
     */
    recommend?: boolean
    /**
     * @description 发布时间
     */
    publishAt?: string
    /**
     * @description 作者（多作者模式）
     */
    authors?: string[]
    uid?: number
    user?: number
  }
  export interface UpdateArticleDto {
    categories?: number[]
    tags?: number[]
    columns?: number[]
    /**
     * @description 类型: Original - 原创 Reprint - 转载
     * @enum Original,Reprint
     */
    type?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description Banner
     */
    banner?: string
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否首页展示
     */
    recommend?: boolean
    /**
     * @description 发布时间
     */
    publishAt?: string
    /**
     * @description 作者（多作者模式）
     */
    authors?: string[]
    uid?: number
    user?: number
  }
  export interface CreateArticleCategoryDto {
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 内容
     */
    articles?: string[]
  }
  export interface UpdateArticleCategoryDto {
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 内容
     */
    articles?: string[]
  }
  export interface CreateArticleTagDto {
    /**
     * @description 标签名
     */
    name: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 此标签下内容
     */
    articles?: string[]
  }
  export interface UpdateArticleTagDto {
    /**
     * @description 标签名
     */
    name?: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 此标签下内容
     */
    articles?: string[]
  }
  export interface CreateCarrierPlatformDto {
    /**
     * @description 名称
     */
    name: string
    /**
     * @description 级别 Country - 国家级 Province - 省级 City - 市级
     * @enum Country,Province,City
     */
    level?: string
    /**
     * @description Logo
     */
    logo?: string
    /**
     * @description 链接
     */
    link?: string
    typeId?: number
    type?: number
    /**
     * @description 详情
     */
    description?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 特色服务
     */
    service?: string
    /**
     * @description 是否首页展示
     */
    isHomeShow?: boolean
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    columnId?: number
    column?: number
    parkId?: number
    park?: number
  }
  export interface UpdateCarrierPlatformDto {
    /**
     * @description 名称
     */
    name?: string
    /**
     * @description 级别 Country - 国家级 Province - 省级 City - 市级
     * @enum Country,Province,City
     */
    level?: string
    /**
     * @description Logo
     */
    logo?: string
    /**
     * @description 链接
     */
    link?: string
    typeId?: number
    type?: number
    /**
     * @description 详情
     */
    description?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 特色服务
     */
    service?: string
    /**
     * @description 是否首页展示
     */
    isHomeShow?: boolean
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    columnId?: number
    column?: number
    parkId?: number
    park?: number
  }
  export interface CreateCarrierPlatformTypeDto {
    /**
     * @description 名称
     */
    name: string
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string[]
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UpdateCarrierPlatformTypeDto {
    /**
     * @description 名称
     */
    name?: string
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string[]
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface CreateColumnDto {
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 栏目层级
     */
    level?: number
    /**
     * @description 前缀
     */
    key: string
    /**
     * @description 跳转链接
     */
    url?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 选中显示图标
     */
    activeIcon?: string
    /**
     * @description 选中显示颜色
     */
    activeColor?: string
    /**
     * @description 二级标题背景
     */
    sectionTitleBg?: string
    /**
     * @description 内容类型
     * @enum List,Single
     */
    contentType?: string
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    parent?: number
    datas?: number[]
    articles?: number[]
    carrierPlatforms?: number[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UpdateColumnDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 栏目层级
     */
    level?: number
    /**
     * @description 前缀
     */
    key?: string
    /**
     * @description 跳转链接
     */
    url?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 选中显示图标
     */
    activeIcon?: string
    /**
     * @description 选中显示颜色
     */
    activeColor?: string
    /**
     * @description 二级标题背景
     */
    sectionTitleBg?: string
    /**
     * @description 内容类型
     * @enum List,Single
     */
    contentType?: string
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    parent?: number
    datas?: number[]
    articles?: number[]
    carrierPlatforms?: number[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface CreateComponentDto {
    /**
     * @description 级别：Page - 页面 Component - 组件级
     * @enum Page,Component
     */
    level?: string
    /**
     * @description 来源：System - 系统内置 Custom - 用户自定义
     * @enum System,Custom
     */
    source?: string
    /**
     * @description 类型：Form - 表单类 Chart - 可视化类 Layout - 布局类  Biz - 业务类 Default - 默认类型
     * @enum Form,Chart,Layout,Biz,Default
     */
    type?: string
    /**
     * @description 组件名
     */
    name: string
    /**
     * @description 中文名
     */
    nameCn: string
    /**
     * @description 分组名
     */
    group: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 截图
     */
    screenshot?: {}
    /**
     * @description 标签
     */
    tags?: string
    /**
     * @description 属性参数
     */
    props?: {}
    /**
     * @description 模板配置项
     */
    templateConfig?: {}
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
  }
  export interface UpdateComponentDto {
    /**
     * @description 级别：Page - 页面 Component - 组件级
     * @enum Page,Component
     */
    level?: string
    /**
     * @description 来源：System - 系统内置 Custom - 用户自定义
     * @enum System,Custom
     */
    source?: string
    /**
     * @description 类型：Form - 表单类 Chart - 可视化类 Layout - 布局类  Biz - 业务类 Default - 默认类型
     * @enum Form,Chart,Layout,Biz,Default
     */
    type?: string
    /**
     * @description 组件名
     */
    name?: string
    /**
     * @description 中文名
     */
    nameCn?: string
    /**
     * @description 分组名
     */
    group?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 截图
     */
    screenshot?: {}
    /**
     * @description 标签
     */
    tags?: string
    /**
     * @description 属性参数
     */
    props?: {}
    /**
     * @description 模板配置项
     */
    templateConfig?: {}
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
  }
  export interface CreateConfigDto {
    /**
     * @description 配置类型：Base - 基础信息 Rule - 园区推介权重规则 Theme - 主题 Layout - 布局 Environment - 环境变量
     * @enum Base,Rule,Theme,Layout,Environment,ParkPurpose,ParkTraffic,ParkLocation,ParkIndustry
     */
    type?: string
    /**
     * @description 配置名
     */
    label: string
    /**
     * @description 配置值
     */
    value?: {}
    /**
     * @description 值格式
     * @enum String,Number,Boolean,Array,Object,NestObject,StringValueObject,BooleanValueObject,NumericValueObject,StringArray,NumberArray,BooleanArray,ObjectArray
     */
    format?: string
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
  }
  export interface UpdateConfigDto {
    /**
     * @description 配置类型：Base - 基础信息 Rule - 园区推介权重规则 Theme - 主题 Layout - 布局 Environment - 环境变量
     * @enum Base,Rule,Theme,Layout,Environment,ParkPurpose,ParkTraffic,ParkLocation,ParkIndustry
     */
    type?: string
    /**
     * @description 配置名
     */
    label?: string
    /**
     * @description 配置值
     */
    value?: {}
    /**
     * @description 值格式
     * @enum String,Number,Boolean,Array,Object,NestObject,StringValueObject,BooleanValueObject,NumericValueObject,StringArray,NumberArray,BooleanArray,ObjectArray
     */
    format?: string
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
  }
  export interface CreateDataDto {
    categories?: number[]
    tags?: number[]
    columns?: number[]
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 链接
     */
    url?: string
    /**
     * @description 图片
     */
    images?: string[]
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否需要审批
     */
    requiredApprove?: boolean
    uid?: number
    user?: number
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UpdateDataDto {
    categories?: number[]
    tags?: number[]
    columns?: number[]
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 链接
     */
    url?: string
    /**
     * @description 图片
     */
    images?: string[]
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否需要审批
     */
    requiredApprove?: boolean
    uid?: number
    user?: number
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface CreateDataCategoryDto {
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    datas?: number[]
    uid?: number
    user?: number
  }
  export interface UpdateDataCategoryDto {
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    datas?: number[]
    uid?: number
    user?: number
  }
  export interface CreateDataTagDto {
    /**
     * @description 标签名
     */
    name: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    datas?: number[]
    uid?: number
    user?: number
  }
  export interface UpdateDataTagDto {
    /**
     * @description 标签名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    datas?: number[]
    uid?: number
    user?: number
  }
  export interface CreateDictionaryDto {
    /**
     * @description System - 系统 User - 用户
     * @enum System,User
     */
    type?: string
    /**
     * @description 字典名
     */
    label: string
    /**
     * @description 字典值
     */
    value?: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
  }
  export interface UpdateDictionaryDto {
    /**
     * @description System - 系统 User - 用户
     * @enum System,User
     */
    type?: string
    /**
     * @description 字典名
     */
    label?: string
    /**
     * @description 字典值
     */
    value?: {}
  }
  export interface CreateFeedbackDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 留言
     */
    feedback: string
    /**
     * @description 留言附件
     */
    attachments?: string[]
    /**
     * @description 答复
     */
    replay?: string
    /**
     * @description 答复附件
     */
    replayAttachments?: string[]
    replayerId?: number
    replyer?: number
  }
  export interface UpdateFeedbackDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 留言
     */
    feedback?: string
    /**
     * @description 留言附件
     */
    attachments?: string[]
    /**
     * @description 答复
     */
    replay?: string
    /**
     * @description 答复附件
     */
    replayAttachments?: string[]
    replayerId?: number
    replyer?: number
  }
  export interface CreateIconDto {
    /**
     * @description 图标名
     */
    name: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 类名
     */
    className?: string
    /**
     * @description 旋转角度
     */
    rotate?: number
    /**
     * @description 是否有旋转动画
     */
    spin?: boolean
    /**
     * @description 双色图标的主要颜色
     */
    twoToneColor?: string
    /**
     * @description 样式
     */
    style?: {}
    /**
     * @description 配置
     */
    props?: {}
    /**
     * @description 自定义渲染组件
     */
    component?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 示例
     */
    examples?: string[]
  }
  export interface UpdateIconDto {
    /**
     * @description 图标名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 类名
     */
    className?: string
    /**
     * @description 旋转角度
     */
    rotate?: number
    /**
     * @description 是否有旋转动画
     */
    spin?: boolean
    /**
     * @description 双色图标的主要颜色
     */
    twoToneColor?: string
    /**
     * @description 样式
     */
    style?: {}
    /**
     * @description 配置
     */
    props?: {}
    /**
     * @description 自定义渲染组件
     */
    component?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 示例
     */
    examples?: string[]
  }
  export interface CreateOpinionCollectionDto {
    /**
     * @description 姓名
     */
    name: string
    /**
     * @description 电话
     */
    phone: string
    /**
     * @description 邮箱
     */
    mail?: string
    /**
     * @description 需求/问题
     */
    opinion: string
    /**
     * @description 所属公司
     */
    company?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否已处理
     */
    processed?: boolean
  }
  export interface UpdateOpinionCollectionDto {
    /**
     * @description 姓名
     */
    name?: string
    /**
     * @description 电话
     */
    phone?: string
    /**
     * @description 邮箱
     */
    mail?: string
    /**
     * @description 需求/问题
     */
    opinion?: string
    /**
     * @description 所属公司
     */
    company?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否已处理
     */
    processed?: boolean
  }
  export interface CreatePageDto {
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 唯一标识
     */
    key: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 配置项描述
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 分组名
     */
    groupName?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    templateId?: number
    template?: number
    appId?: number
    application?: number
    parentId?: number
    parentPage?: number
    pageHistory?: number[]
    childPages?: number[]
  }
  export interface UpdatePageLocalDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 唯一标识
     */
    key?: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 配置项描述
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 分组名
     */
    groupName?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    templateId?: number
    template?: number
    appId?: number
    application?: number
    parentId?: number
    parentPage?: number
    pageHistory?: number[]
    childPages?: number[]
  }
  export interface CreatePageHistoryDto {
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    /**
     * @description 版本号
     */
    version?: string
    pageId?: number
    page?: number
    templateId?: number
    template?: number
  }
  export interface CreateParkDto {
    /**
     * @description 园区名称
     */
    name: string
    /**
     * @description 园区介绍详情地址
     */
    link: string
    /**
     * @description 封面图，第一张图作为封面
     */
    covers?: string[]
    /**
     * @description 首页展示信息
     */
    homeIntroduction?: string
    /**
     * @description 园区简介
     */
    introduction?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 在南京地图上的横坐标，相对于305*562底图
     */
    x: number
    /**
     * @description 在南京地图上的纵坐标，相对于305*562底图
     */
    y: number
    /**
     * @description 园区介绍文章
     */
    content?: string
    /**
     * @description 园区级别
     */
    level?: string
    /**
     * @description 浏览目的
     */
    purpose?: string[]
    /**
     * @description 所在位置
     */
    location?: string
    /**
     * @description 区域位置
     */
    zoneLocations?: string[]
    /**
     * @description 创立时间
     */
    openingTime?: string
    /**
     * @description 园区面积(㎡)
     */
    area?: string
    /**
     * @description 园区规模
     */
    scale?: string
    /**
     * @description 环境
     */
    environment?: string
    /**
     * @description 物业
     */
    property?: string
    /**
     * @description 税收
     */
    tax?: string
    /**
     * @description 租金
     */
    rent?: string
    /**
     * @description 交通
     */
    traffic?: string[]
    /**
     * @description 信息资源
     */
    informations?: string[]
    /**
     * @description 金融服务
     */
    finance?: string[]
    /**
     * @description 生活服务
     */
    life?: string[]
    /**
     * @description 支柱产业
     */
    pillarIndustry?: string[]
    /**
     * @description 培育产业
     */
    cultivatingIndustry?: string[]
    /**
     * @description 是否是市高新区
     */
    isCentral?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 标签
     */
    tags?: string[]
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string[]
  }
  export interface UpdateParkDto {
    /**
     * @description 园区名称
     */
    name?: string
    /**
     * @description 园区介绍详情地址
     */
    link?: string
    /**
     * @description 封面图，第一张图作为封面
     */
    covers?: string[]
    /**
     * @description 首页展示信息
     */
    homeIntroduction?: string
    /**
     * @description 园区简介
     */
    introduction?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 在南京地图上的横坐标，相对于305*562底图
     */
    x?: number
    /**
     * @description 在南京地图上的纵坐标，相对于305*562底图
     */
    y?: number
    /**
     * @description 园区介绍文章
     */
    content?: string
    /**
     * @description 园区级别
     */
    level?: string
    /**
     * @description 浏览目的
     */
    purpose?: string[]
    /**
     * @description 所在位置
     */
    location?: string
    /**
     * @description 区域位置
     */
    zoneLocations?: string[]
    /**
     * @description 创立时间
     */
    openingTime?: string
    /**
     * @description 园区面积(㎡)
     */
    area?: string
    /**
     * @description 园区规模
     */
    scale?: string
    /**
     * @description 环境
     */
    environment?: string
    /**
     * @description 物业
     */
    property?: string
    /**
     * @description 税收
     */
    tax?: string
    /**
     * @description 租金
     */
    rent?: string
    /**
     * @description 交通
     */
    traffic?: string[]
    /**
     * @description 信息资源
     */
    informations?: string[]
    /**
     * @description 金融服务
     */
    finance?: string[]
    /**
     * @description 生活服务
     */
    life?: string[]
    /**
     * @description 支柱产业
     */
    pillarIndustry?: string[]
    /**
     * @description 培育产业
     */
    cultivatingIndustry?: string[]
    /**
     * @description 是否是市高新区
     */
    isCentral?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 标签
     */
    tags?: string[]
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string[]
  }
  export interface CreatePermissionDto {
    /**
     * @description 权限名
     */
    name: string
    /**
     * @description 权限描述
     */
    description?: string
    /**
     * @description 是否系统权限
     */
    isSystemPreset?: boolean
    /**
     * @description 归属角色
     */
    roles?: string[]
  }
  export interface UpdatePermissionDto {
    /**
     * @description 权限名
     */
    name?: string
    /**
     * @description 权限描述
     */
    description?: string
    /**
     * @description 归属角色
     */
    roles?: string[]
  }
  export interface CreateQADto {
    categoryId?: number
    category?: number
    /**
     * @description 问题
     */
    question: string
    /**
     * @description 答复
     */
    answer?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UpdateQADto {
    categoryId?: number
    category?: number
    /**
     * @description 问题
     */
    question?: string
    /**
     * @description 答复
     */
    answer?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface CreateQACategoryDto {
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 问题与答复
     */
    qas?: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UpdateQACategoryDto {
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 问题与答复
     */
    qas?: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface UploadDto {
    /**
     * @description 文件
     */
    file: File
  }
  export interface CreateRoleDto {
    /**
     * @description 角色名
     */
    name: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 是否系统角色
     */
    isSystemPreset?: boolean
    /**
     * @description 该角色拥有的管理员
     */
    admins?: string[]
    /**
     * @description 拥有的权限
     */
    permissions?: string[]
  }
  export interface UpdateRoleDto {
    /**
     * @description 角色名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 该角色拥有的管理员
     */
    admins?: string[]
    /**
     * @description 拥有的权限
     */
    permissions?: string[]
  }
  export interface NCreateChoiceDto {
    /**
     * @description 选项文本
     */
    text?: string
    /**
     * @description 选项图片
     */
    image?: string
    /**
     * @description 是否可自定义内容
     */
    isCustom?: boolean
  }
  export interface NCreateQuestionDto {
    /**
     * @description 问题文本
     */
    text: string
    /**
     * @description 问题类型：单选/多选
     * @enum Single,Multiple
     */
    type: string
    /**
     * @description 可选选项数量限制
     */
    limit?: number
    /**
     * @description 选项
     */
    choices?: ApiDocuments.NCreateChoiceDto[]
    /**
     * @description 是否必填
     */
    isRequired?: boolean
  }
  export interface NCreateSurveyDto {
    /**
     * @description 问卷标题
     */
    title: string
    /**
     * @description 描述
     */
    detail?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否启用
     */
    isEnabled?: boolean
    /**
     * @description 问题列表
     */
    questions?: ApiDocuments.NCreateQuestionDto[]
    /**
     * @description 排序号
     */
    order?: number
  }
  export interface NCreateAnswerChoiceDto {
    /**
     * @description 选项Id
     */
    choiceId?: number
    /**
     * @description 自定义内容
     */
    customContent?: string
  }
  export interface NCreateAnswerDto {
    /**
     * @description 填报人姓名
     */
    userName?: string
    /**
     * @description 问卷Id
     */
    surveyId?: number
    choices?: ApiDocuments.NCreateAnswerChoiceDto[]
  }
  export interface CreateTableDto {
    /**
     * @description 数据库类型
     * @enum MySQL,MongoDB,PostgreSQL
     */
    databaseType?: string
    /**
     * @description name
     */
    name: string
    /**
     * @description 数据库表名
     */
    databaseTableName?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 字段
     */
    fields?: string[]
    /**
     * @description 是否嵌套结构
     */
    nested?: boolean
    /**
     * @description 嵌套最大深度
     */
    maxNestingDepth?: number
    /**
     * @description 嵌套映射关系
     * @enum OneToOne,OneToMany,ManyToMany
     */
    nestMappingRelation?: string
    /**
     * @description 嵌套父项字段
     */
    nestParentKey?: string
    /**
     * @description 嵌套子项字段
     */
    nestChildrenKey?: string
    /**
     * @description 可删除
     */
    deletable?: boolean
    /**
     * @description 主键
     */
    primaryKeys?: string[]
    /**
     * @description 索引
     */
    indexs?: string[]
    /**
     * @description 同步
     */
    sync?: boolean
    /**
     * @description 状态
     * @enum Doing,Done,Disabled
     */
    status?: string
    /**
     * @description 备份数据
     */
    backup?: boolean
    /**
     * @description 备份策略
     */
    backupStrategy?: {}
    /**
     * @description 生成接口
     */
    generateInterfaces?: {}
    /**
     * @description 版本
     */
    version?: string
  }
  export interface UpdateTableDto {
    /**
     * @description 数据库类型
     * @enum MySQL,MongoDB,PostgreSQL
     */
    databaseType?: string
    /**
     * @description name
     */
    name?: string
    /**
     * @description 数据库表名
     */
    databaseTableName?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 字段
     */
    fields?: string[]
    /**
     * @description 是否嵌套结构
     */
    nested?: boolean
    /**
     * @description 嵌套最大深度
     */
    maxNestingDepth?: number
    /**
     * @description 嵌套映射关系
     * @enum OneToOne,OneToMany,ManyToMany
     */
    nestMappingRelation?: string
    /**
     * @description 嵌套父项字段
     */
    nestParentKey?: string
    /**
     * @description 嵌套子项字段
     */
    nestChildrenKey?: string
    /**
     * @description 可删除
     */
    deletable?: boolean
    /**
     * @description 主键
     */
    primaryKeys?: string[]
    /**
     * @description 索引
     */
    indexs?: string[]
    /**
     * @description 同步
     */
    sync?: boolean
    /**
     * @description 状态
     * @enum Doing,Done,Disabled
     */
    status?: string
    /**
     * @description 备份数据
     */
    backup?: boolean
    /**
     * @description 备份策略
     */
    backupStrategy?: {}
    /**
     * @description 生成接口
     */
    generateInterfaces?: {}
    /**
     * @description 版本
     */
    version?: string
  }
  export interface CreateTableFieldDto {
    /**
     * @description 字段名(English)
     */
    name: string
    /**
     * @description 数据库中字段名
     */
    databaseFieldName?: string
    /**
     * @description 类型
     * @enum String,Boolean,Int,BigInt,Float,Decimal,DateTime,Json,Bytes,Unsupported
     */
    type?: string
    /**
     * @description 原始数据库类型
     * @enum dbText,dbChar_x,dbVarChar_n,dbBit_x,dbVarBit,dbUuid,dbXml,dbInet,dbCitext
     */
    nativeType?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 备注
     */
    comment?: string
    /**
     * @description 是否数组
     */
    isList?: boolean
    /**
     * @description 值类型
     * @enum isInteger,isFloat,isUrl,isFile,isIcon,isImage,isColor,isChart,isSwitch,isButton,isBadge,isCode,isJSON,isProgress,isInput,isRadio,isCheckbox,isRichText,isTextArea,isDateTime
     */
    valueType?: string
    /**
     * @description 数字范围
     */
    range?: {}
    /**
     * @description 字符长度
     */
    length?: {}
    /**
     * @description 小数点
     */
    decimal?: number
    defaultValue?: {}
    /**
     * @description 有效值
     */
    validValues?: {}
    /**
     * @description Mock数据
     */
    mock?: string
    /**
     * @description 允许空值
     */
    nullable?: boolean
    /**
     * @description 是否主键
     */
    primary?: boolean
    /**
     * @enum now,cuid,uuid,dbgenerated,autoincrement
     */
    primaryKeyStrategy?: string
    /**
     * @description 是否索引
     */
    index?: boolean
    /**
     * @description 是否必填
     */
    required?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 是否只读
     */
    readonly?: boolean
    /**
     * @description 是否系统内置
     */
    systemPreset?: boolean
    /**
     * @description 校验
     */
    validators?: {}
    /**
     * @description 入库转换
     */
    transform?: {}
    /**
     * @description 是否查询不返回
     */
    selectFalse?: boolean
    /**
     * @description 是否不作为查询条件
     */
    ignoreQuery?: boolean
    /**
     * @description 是否禁止创建
     */
    ignoreCreate?: boolean
    /**
     * @description 是否禁止更新
     */
    ignoreUpdate?: boolean
    /**
     * @description 是否禁止删除
     */
    ignoreDelete?: boolean
    /**
     * @description 关联字典项
     */
    relationDictionary?: string
    tableId?: number
    table?: number
  }
  export interface UpdateTableFieldDto {
    /**
     * @description 字段名(English)
     */
    name?: string
    /**
     * @description 数据库中字段名
     */
    databaseFieldName?: string
    /**
     * @description 类型
     * @enum String,Boolean,Int,BigInt,Float,Decimal,DateTime,Json,Bytes,Unsupported
     */
    type?: string
    /**
     * @description 原始数据库类型
     * @enum dbText,dbChar_x,dbVarChar_n,dbBit_x,dbVarBit,dbUuid,dbXml,dbInet,dbCitext
     */
    nativeType?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 备注
     */
    comment?: string
    /**
     * @description 是否数组
     */
    isList?: boolean
    /**
     * @description 值类型
     * @enum isInteger,isFloat,isUrl,isFile,isIcon,isImage,isColor,isChart,isSwitch,isButton,isBadge,isCode,isJSON,isProgress,isInput,isRadio,isCheckbox,isRichText,isTextArea,isDateTime
     */
    valueType?: string
    /**
     * @description 数字范围
     */
    range?: {}
    /**
     * @description 字符长度
     */
    length?: {}
    /**
     * @description 小数点
     */
    decimal?: number
    defaultValue?: {}
    /**
     * @description 有效值
     */
    validValues?: {}
    /**
     * @description Mock数据
     */
    mock?: string
    /**
     * @description 允许空值
     */
    nullable?: boolean
    /**
     * @description 是否主键
     */
    primary?: boolean
    /**
     * @enum now,cuid,uuid,dbgenerated,autoincrement
     */
    primaryKeyStrategy?: string
    /**
     * @description 是否索引
     */
    index?: boolean
    /**
     * @description 是否必填
     */
    required?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 是否只读
     */
    readonly?: boolean
    /**
     * @description 是否系统内置
     */
    systemPreset?: boolean
    /**
     * @description 校验
     */
    validators?: {}
    /**
     * @description 入库转换
     */
    transform?: {}
    /**
     * @description 是否查询不返回
     */
    selectFalse?: boolean
    /**
     * @description 是否不作为查询条件
     */
    ignoreQuery?: boolean
    /**
     * @description 是否禁止创建
     */
    ignoreCreate?: boolean
    /**
     * @description 是否禁止更新
     */
    ignoreUpdate?: boolean
    /**
     * @description 是否禁止删除
     */
    ignoreDelete?: boolean
    /**
     * @description 关联字典项
     */
    relationDictionary?: string
    tableId?: number
    table?: number
  }
  export interface CreateTemplateDto {
    /**
     * @description 模板名称
     */
    name: string
    /**
     * @description 模板图标
     */
    icon?: string
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    pageModel?: string[]
    pageHistoryModel?: string[]
  }
  export interface UpdateTemplateDto {
    /**
     * @description 模板名称
     */
    name?: string
    /**
     * @description 模板图标
     */
    icon?: string
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    pageModel?: string[]
    pageHistoryModel?: string[]
  }
  export interface ApiResponseVo {
    /**
     * @description 响应状态码
     * @default 200
     */
    status: number
    /**
     * @description 提示信息
     */
    message: string
    /**
     * @description 错误代码
     */
    errCode: string
    /**
     * @description 是否成功
     */
    success: boolean
    /**
     * @description 错误信息
     */
    errMessage: string
  }
  export interface UploadFileVo {
    /**
     * @description 文件网络地址
     */
    url: string
    /**
     * @description 文件大小
     */
    size?: number
    /**
     * @description MIME Type
     */
    mimetype?: string
    /**
     * @description Field
     */
    fieldName?: string
    /**
     * @description 原始文件名
     */
    originalName?: string
  }
  export interface ConnectArticleDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryArticleDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类（多分类）
     */
    categories?: string
    /**
     * @description 标签（多标签）
     */
    tags?: string
    /**
     * @description 所属栏目
     */
    columns?: string
    /**
     * @description 类型: Original - 原创 Reprint - 转载
     * @enum Original,Reprint
     */
    type?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description Banner
     */
    banner?: string
    /**
     * @description 封面图
     */
    cover?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否首页展示
     */
    recommend?: boolean
    /**
     * @description 发布时间
     */
    publishAt?: string
    /**
     * @description 作者（多作者模式）
     */
    authors?: string[]
    /**
     * @description 添加者
     */
    uid?: number
    /**
     * @description 添加者
     */
    user?: string
  }
  export interface ConnectArticleCategoryDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryArticleCategoryDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 内容
     */
    articles?: string
  }
  export interface ConnectArticleTagDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryArticleTagDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标签名
     */
    name?: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 此标签下内容
     */
    articles?: string
  }
  export interface ConnectUserDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateUserDto {
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password: string
  }
  export interface UpdateUserDto {
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username?: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password?: string
  }
  export interface QueryUserDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username?: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password?: string
  }
  export interface ConnectProfileDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateProfileDto {
    /**
     * @description 姓名
     */
    name?: string
    /**
     * @description 邮箱
     */
    email?: string
    /**
     * @description 手机号
     */
    mobile?: string
    /**
     * @description 头像
     */
    avatar?: string
    /**
     * @description 性别
     * @enum Male,Female,Unkown
     */
    gender?: string
    /**
     * @description 省/直辖市
     */
    province?: string
    /**
     * @description 市/市辖区
     */
    city?: string
    /**
     * @description 区
     */
    district?: string
    /**
     * @description 出生日期
     */
    birthday?: string
    /**
     * @description 详细地址
     */
    address?: string
    /**
     * @description 邮编
     */
    zipCode?: string
    /**
     * @description 所属用户
     */
    uid: number
  }
  export interface UpdateProfileDto {
    /**
     * @description 姓名
     */
    name?: string
    /**
     * @description 邮箱
     */
    email?: string
    /**
     * @description 手机号
     */
    mobile?: string
    /**
     * @description 头像
     */
    avatar?: string
    /**
     * @description 性别
     * @enum Male,Female,Unkown
     */
    gender?: string
    /**
     * @description 省/直辖市
     */
    province?: string
    /**
     * @description 市/市辖区
     */
    city?: string
    /**
     * @description 区
     */
    district?: string
    /**
     * @description 出生日期
     */
    birthday?: string
    /**
     * @description 详细地址
     */
    address?: string
    /**
     * @description 邮编
     */
    zipCode?: string
    /**
     * @description 所属用户
     */
    uid?: number
  }
  export interface QueryProfileDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 姓名
     */
    name?: string
    /**
     * @description 邮箱
     */
    email?: string
    /**
     * @description 手机号
     */
    mobile?: string
    /**
     * @description 头像
     */
    avatar?: string
    /**
     * @description 性别
     * @enum Male,Female,Unkown
     */
    gender?: string
    /**
     * @description 省/直辖市
     */
    province?: string
    /**
     * @description 市/市辖区
     */
    city?: string
    /**
     * @description 区
     */
    district?: string
    /**
     * @description 出生日期
     */
    birthday?: string
    /**
     * @description 详细地址
     */
    address?: string
    /**
     * @description 邮编
     */
    zipCode?: string
    /**
     * @description 所属用户
     */
    uid?: number
  }
  export interface ConnectOrganizationDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateOrganizationDto {
    /**
     * @description 部门名
     */
    name: string
    /**
     * @description 部门简介
     */
    introduction?: string
    parentId?: number
  }
  export interface UpdateOrganizationDto {
    /**
     * @description 部门名
     */
    name?: string
    /**
     * @description 部门简介
     */
    introduction?: string
    parentId?: number
  }
  export interface QueryOrganizationDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 部门名
     */
    name?: string
    /**
     * @description 部门简介
     */
    introduction?: string
    /**
     * @description 上级组织
     */
    parentId?: number
    /**
     * @description 上级组织
     */
    parent?: string
    /**
     * @description 下级组织
     */
    subordinate?: string
  }
  export interface ConnectColumnDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryColumnDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 栏目层级
     */
    level?: number
    /**
     * @description 前缀
     */
    key?: string
    /**
     * @description 跳转链接
     */
    url?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 选中显示图标
     */
    activeIcon?: string
    /**
     * @description 选中显示颜色
     */
    activeColor?: string
    /**
     * @description 二级标题背景
     */
    sectionTitleBg?: string
    /**
     * @description 内容类型
     * @enum List,Single
     */
    contentType?: string
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 父栏目
     */
    parentId?: number
    /**
     * @description 父栏目
     */
    parent?: string
    /**
     * @description 子栏目
     */
    children?: string
    /**
     * @description 关联数据
     */
    datas?: string
    /**
     * @description 关联内容
     */
    articles?: string
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface ConnectDataCategoryDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryDataCategoryDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 数据
     */
    datas?: string
    /**
     * @description 添加者，可为空，即系统初始化时注入
     */
    uid?: number
    /**
     * @description 添加者，可为空，即系统初始化时注入
     */
    user?: string
  }
  export interface ConnectDataTagDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryDataTagDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标签名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 颜色
     */
    color?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 此标签下数据
     */
    datas?: string
    /**
     * @description 建此标签的用户，可为空，即系统初始化时注入
     */
    uid?: number
    /**
     * @description 建此标签的用户
     */
    user?: string
  }
  export interface ConnectDataDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryDataDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类
     */
    categories?: string
    /**
     * @description 标签
     */
    tags?: string
    /**
     * @description 所属栏目
     */
    columns?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 内容
     */
    content?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 链接
     */
    url?: string
    /**
     * @description 图片
     */
    images?: string[]
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus?: string
    /**
     * @description 是否需要审批
     */
    requiredApprove?: boolean
    /**
     * @description 添加数据者，可为空，即系统初始化时注入
     */
    uid?: number
    /**
     * @description 添加数据者，可为空，即系统初始化时注入
     */
    user?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface ConnectAdminDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryAdminDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username?: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password?: string
    /**
     * @description 状态 Normal - 正常 Disabled - 禁用
     * @enum Normal,Disabled
     */
    status?: string
    /**
     * @description 标签
     */
    tags?: string
    /**
     * @description 数据
     */
    datas?: string
    /**
     * @description 文件
     */
    files?: string
    /**
     * @description 分类
     */
    categories?: string
    /**
     * @description 回复的留言
     */
    feedbackReplys?: string
    /**
     * @description 所属角色
     */
    roleId?: number
    /**
     * @description 所属角色
     */
    role?: string
    /**
     * @description 发布的内容
     */
    articles?: string
  }
  export interface ConnectRoleDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryRoleDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 角色名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 是否系统角色
     */
    isSystemPreset?: boolean
    /**
     * @description 该角色拥有的管理员
     */
    admins?: string
    /**
     * @description 拥有的权限
     */
    permissions?: string
  }
  export interface ConnectPermissionDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryPermissionDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 权限名
     */
    name?: string
    /**
     * @description 权限描述
     */
    description?: string
    /**
     * @description 是否系统权限
     */
    isSystemPreset?: boolean
    /**
     * @description 归属角色
     */
    roles?: string
  }
  export interface ConnectDictionaryDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryDictionaryDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description System - 系统 User - 用户
     * @enum System,User
     */
    type?: string
    /**
     * @description 字典名
     */
    label?: string
    /**
     * @description 字典值
     */
    value?: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
  }
  export interface ConnectConfigDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryConfigDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 配置类型：Base - 基础信息 Rule - 园区推介权重规则 Theme - 主题 Layout - 布局 Environment - 环境变量
     * @enum Base,Rule,Theme,Layout,Environment,ParkPurpose,ParkTraffic,ParkLocation,ParkIndustry
     */
    type?: string
    /**
     * @description 配置名
     */
    label?: string
    /**
     * @description 配置值
     */
    value?: {}
    /**
     * @description 值格式
     * @enum String,Number,Boolean,Array,Object,NestObject,StringValueObject,BooleanValueObject,NumericValueObject,StringArray,NumberArray,BooleanArray,ObjectArray
     */
    format?: string
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
  }
  export interface ConnectFileDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateFileDto {
    /**
     * @description 在线地址
     */
    url: string
    /**
     * @description 文件后缀
     */
    suffix: string
    uploaderId?: number
    uploader?: number
  }
  export interface UpdateFileDto {
    /**
     * @description 在线地址
     */
    url?: string
    /**
     * @description 文件后缀
     */
    suffix?: string
    uploaderId?: number
    uploader?: number
  }
  export interface QueryFileDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 在线地址
     */
    url?: string
    /**
     * @description 文件后缀
     */
    suffix?: string
    /**
     * @description 上传者，可以是用户或管理员
     */
    uploaderId?: number
    /**
     * @description 上传者
     */
    uploader?: string
  }
  export interface ConnectRouteDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateRouteDto {
    /**
     * @description 菜单名
     */
    name: string
    /**
     * @description 访问路径
     */
    path: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 是否严格匹配
     */
    exact?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 关联组件或页面
     */
    component?: string
    /**
     * @description 菜单位置
     * @enum Top,Right,Botton,Left
     */
    layout?: string
    /**
     * @description 额外配置信息
     */
    config?: {}
    parentId?: number
    parent?: number
    children?: number[]
  }
  export interface UpdateRouteDto {
    /**
     * @description 菜单名
     */
    name?: string
    /**
     * @description 访问路径
     */
    path?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 是否严格匹配
     */
    exact?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 关联组件或页面
     */
    component?: string
    /**
     * @description 菜单位置
     * @enum Top,Right,Botton,Left
     */
    layout?: string
    /**
     * @description 额外配置信息
     */
    config?: {}
    parentId?: number
    parent?: number
    children?: number[]
  }
  export interface QueryRouteDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 菜单名
     */
    name?: string
    /**
     * @description 访问路径
     */
    path?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 是否严格匹配
     */
    exact?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 关联组件或页面
     */
    component?: string
    /**
     * @description 菜单位置
     * @enum Top,Right,Botton,Left
     */
    layout?: string
    /**
     * @description 额外配置信息
     */
    config?: {}
    /**
     * @description 父路由/父菜单
     */
    parentId?: number
    /**
     * @description 父路由/父菜单
     */
    parent?: string
    /**
     * @description 子路由/子菜单
     */
    children?: string
  }
  export interface ConnectComponentDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryComponentDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 级别：Page - 页面 Component - 组件级
     * @enum Page,Component
     */
    level?: string
    /**
     * @description 来源：System - 系统内置 Custom - 用户自定义
     * @enum System,Custom
     */
    source?: string
    /**
     * @description 类型：Form - 表单类 Chart - 可视化类 Layout - 布局类  Biz - 业务类 Default - 默认类型
     * @enum Form,Chart,Layout,Biz,Default
     */
    type?: string
    /**
     * @description 组件名
     */
    name?: string
    /**
     * @description 中文名
     */
    nameCn?: string
    /**
     * @description 分组名
     */
    group?: string
    /**
     * @description 图标
     */
    icon?: string
    /**
     * @description 截图
     */
    screenshot?: {}
    /**
     * @description 标签
     */
    tags?: string
    /**
     * @description 属性参数
     */
    props?: {}
    /**
     * @description 模板配置项
     */
    templateConfig?: {}
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
  }
  export interface ConnectTemplateDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryTemplateDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 模板名称
     */
    name?: string
    /**
     * @description 模板图标
     */
    icon?: string
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    pageModel?: string
    pageHistoryModel?: string
  }
  export interface ConnectApplicationDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryApplicationDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 当前使用的主题
     */
    theme?: string
    /**
     * @description 配置项
     */
    config?: {}
    /**
     * @description 配置项值
     */
    globalProps?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    /**
     * @description 当前版本号
     */
    version?: string
    /**
     * @description 包含页面
     */
    pages?: string
    /**
     * @description 版本列表
     */
    versions?: string
  }
  export interface ConnectApplicationVersionDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateApplicationVersionDto {
    /**
     * @description 版本号
     */
    version?: string
    /**
     * @description 主题
     */
    theme?: string
    appId?: number
    application?: number
  }
  export interface UpdateApplicationVersionDto {
    /**
     * @description 版本号
     */
    version?: string
    /**
     * @description 主题
     */
    theme?: string
    appId?: number
    application?: number
  }
  export interface QueryApplicationVersionDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 版本号
     */
    version?: string
    /**
     * @description 主题
     */
    theme?: string
    /**
     * @description 应用ID
     */
    appId?: number
    /**
     * @description 应用
     */
    application?: string
  }
  export interface ConnectPageDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface UpdatePageDto {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 唯一标识
     */
    key?: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 配置项描述
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 分组名
     */
    groupName?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    templateId?: number
    template?: number
    appId?: number
    application?: number
    parentId?: number
    parentPage?: number
    pageHistory?: number[]
    childPages?: number[]
  }
  export interface QueryPageDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 唯一标识
     */
    key?: string
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 图标
     */
    icon?: {}
    /**
     * @description 配置项描述
     */
    config?: {}
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 分组名
     */
    groupName?: string
    /**
     * @description 相对最新版本是否有改动
     */
    changed?: boolean
    /**
     * @description 初始模板ID
     */
    templateId?: number
    /**
     * @description 初始模板
     */
    template?: string
    /**
     * @description 所属应用ID
     */
    appId?: number
    /**
     * @description 所属应用
     */
    application?: string
    /**
     * @description 父页面ID
     */
    parentId?: number
    /**
     * @description 所属应用
     */
    parentPage?: string
    /**
     * @description 变更历史记录
     */
    pageHistory?: string
    childPages?: string
  }
  export interface ConnectPageHistoryDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface UpdatePageHistoryDto {
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    /**
     * @description 版本号
     */
    version?: string
    pageId?: number
    page?: number
    templateId?: number
    template?: number
  }
  export interface QueryPageHistoryDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: {}
    /**
     * @description 布局配置
     */
    layouts?: {}
    /**
     * @description 版本号
     */
    version?: string
    /**
     * @description 所属页面
     */
    pageId?: number
    /**
     * @description 所属页面
     */
    page?: string
    /**
     * @description 模板ID
     */
    templateId?: number
    /**
     * @description 模板
     */
    template?: string
  }
  export interface ConnectIconDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryIconDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 图标名
     */
    name?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 类名
     */
    className?: string
    /**
     * @description 旋转角度
     */
    rotate?: number
    /**
     * @description 是否有旋转动画
     */
    spin?: boolean
    /**
     * @description 双色图标的主要颜色
     */
    twoToneColor?: string
    /**
     * @description 样式
     */
    style?: {}
    /**
     * @description 配置
     */
    props?: {}
    /**
     * @description 自定义渲染组件
     */
    component?: string
    /**
     * @description 来源
     */
    source?: string
    /**
     * @description 示例
     */
    examples?: string[]
  }
  export interface ConnectRequestLogDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryRequestLogDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 请求方法
     * @enum GET,PUT,HEAD,POST,PATCH,DELETE,OPTIONS
     */
    method?: string
    /**
     * @description 请求地址
     */
    path?: string
    /**
     * @description 请求平台
     * @enum Portal,Admin
     */
    platform?: string
    /**
     * @description 操作描述
     */
    description?: string
    /**
     * @description 访问 IP
     */
    ip?: string
    /**
     * @description IP所在地址
     */
    address?: {}
    /**
     * @description 请求头
     */
    headers?: {}
    /**
     * @description 解析
     */
    analysis?: {}
    /**
     * @description 请求body
     */
    body?: {}
    /**
     * @description 响应状态码
     */
    status?: number
    /**
     * @description 是否成功
     */
    success?: boolean
    /**
     * @description 请求-响应耗时(ms)
     */
    took?: number
    /**
     * @description 唯一用户标识
     */
    guid?: string
    /**
     * @description 用户名
     */
    username?: string
    /**
     * @description 错误信息
     */
    error?: {}
  }
  export interface ConnectVisitStatsDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateVisitStatsDto {
    /**
     * @description 统计日期
     */
    date: string
    /**
     * @description 栏目
     */
    column: string
    /**
     * @description 访问数据
     */
    count: number
    /**
     * @description IP数据
     */
    ipCount?: number
    /**
     * @description 栏目层级
     */
    level?: number
  }
  export interface QueryVisitStatsDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 统计日期
     */
    date?: string
    /**
     * @description 栏目
     */
    column?: string
    /**
     * @description 访问数据
     */
    count?: number
    /**
     * @description IP数据
     */
    ipCount?: number
    /**
     * @description 栏目层级
     */
    level?: number
  }
  export interface ConnectSurveyDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateSurveyDto {
    /**
     * @description 问卷标题
     */
    title: string
    /**
     * @description 描述
     */
    detail?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否启用
     */
    isEnabled?: boolean
    /**
     * @description 参与总次数
     */
    total?: number
    /**
     * @description 参与总人数
     */
    pTotal?: number
    /**
     * @description 排序号
     */
    order?: number
    questions?: string[]
    answers?: string[]
  }
  export interface UpdateSurveyDto {
    /**
     * @description 问卷标题
     */
    title?: string
    /**
     * @description 描述
     */
    detail?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否启用
     */
    isEnabled?: boolean
    /**
     * @description 参与总次数
     */
    total?: number
    /**
     * @description 参与总人数
     */
    pTotal?: number
    /**
     * @description 排序号
     */
    order?: number
    questions?: string[]
    answers?: string[]
  }
  export interface QuerySurveyDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 问卷标题
     */
    title?: string
    /**
     * @description 描述
     */
    detail?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否启用
     */
    isEnabled?: boolean
    /**
     * @description 参与总次数
     */
    total?: number
    /**
     * @description 参与总人数
     */
    pTotal?: number
    /**
     * @description 排序号
     */
    order?: number
    questions?: string
    answers?: string
  }
  export interface ConnectQuestionDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateQuestionDto {
    /**
     * @description 问题文本
     */
    text: string
    /**
     * @description 问题类型：单选/多选
     * @enum Single,Multiple
     */
    type: string
    /**
     * @description 可选选项数量限制
     */
    limit?: number
    /**
     * @description 是否必填
     */
    isRequired?: boolean
    surveyId?: number
    /**
     * @description 排序号
     */
    order?: number
    survey?: number
    choices?: number[]
  }
  export interface UpdateQuestionDto {
    /**
     * @description 问题文本
     */
    text?: string
    /**
     * @description 问题类型：单选/多选
     * @enum Single,Multiple
     */
    type?: string
    /**
     * @description 可选选项数量限制
     */
    limit?: number
    /**
     * @description 是否必填
     */
    isRequired?: boolean
    surveyId?: number
    /**
     * @description 排序号
     */
    order?: number
    survey?: number
    choices?: number[]
  }
  export interface QueryQuestionDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 问题文本
     */
    text?: string
    /**
     * @description 问题类型：单选/多选
     * @enum Single,Multiple
     */
    type?: string
    /**
     * @description 可选选项数量限制
     */
    limit?: number
    /**
     * @description 是否必填
     */
    isRequired?: boolean
    /**
     * @description 问卷Id
     */
    surveyId?: number
    /**
     * @description 排序号
     */
    order?: number
    /**
     * @description 问卷
     */
    survey?: string
    choices?: string
  }
  export interface ConnectChoiceDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateChoiceDto {
    /**
     * @description 选项文本
     */
    text?: string
    /**
     * @description 选项图片
     */
    image?: string
    /**
     * @description 是否可自定义内容
     */
    isCustom?: boolean
    questionId?: number
    /**
     * @description 排序号
     */
    order?: number
    question?: number
    anserChoices?: number[]
  }
  export interface UpdateChoiceDto {
    /**
     * @description 选项文本
     */
    text?: string
    /**
     * @description 选项图片
     */
    image?: string
    /**
     * @description 是否可自定义内容
     */
    isCustom?: boolean
    questionId?: number
    /**
     * @description 排序号
     */
    order?: number
    question?: number
    anserChoices?: number[]
  }
  export interface QueryChoiceDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 选项文本
     */
    text?: string
    /**
     * @description 选项图片
     */
    image?: string
    /**
     * @description 是否可自定义内容
     */
    isCustom?: boolean
    /**
     * @description 问题Id
     */
    questionId?: number
    /**
     * @description 排序号
     */
    order?: number
    /**
     * @description 问题
     */
    question?: string
    anserChoices?: string
  }
  export interface ConnectAnswerDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateAnswerDto {
    /**
     * @description 填报人姓名
     */
    userName?: string
    /**
     * @description 填报IP
     */
    ip?: string
    surveyId?: number
    survey?: number
    choices?: number[]
  }
  export interface UpdateAnswerDto {
    /**
     * @description 填报人姓名
     */
    userName?: string
    /**
     * @description 填报IP
     */
    ip?: string
    surveyId?: number
    survey?: number
    choices?: number[]
  }
  export interface QueryAnswerDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 填报人姓名
     */
    userName?: string
    /**
     * @description 填报IP
     */
    ip?: string
    /**
     * @description 问卷Id
     */
    surveyId?: number
    /**
     * @description 问卷
     */
    survey?: string
    choices?: string
  }
  export interface ConnectAnswerChoiceDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface CreateAnswerChoiceDto {
    answerId?: number
    answer?: number
    choiceId?: number
    choice?: number
    /**
     * @description 自定义内容
     */
    customContent?: string
  }
  export interface UpdateAnswerChoiceDto {
    answerId?: number
    answer?: number
    choiceId?: number
    choice?: number
    /**
     * @description 自定义内容
     */
    customContent?: string
  }
  export interface QueryAnswerChoiceDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 对应答卷Id
     */
    answerId?: number
    /**
     * @description 对应答卷
     */
    answer?: string
    /**
     * @description 对应答卷Id
     */
    choiceId?: number
    /**
     * @description 对应答卷
     */
    choice?: string
    /**
     * @description 自定义内容
     */
    customContent?: string
  }
  export interface ConnectFeedbackDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryFeedbackDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 留言
     */
    feedback?: string
    /**
     * @description 留言附件
     */
    attachments?: string[]
    /**
     * @description 答复
     */
    replay?: string
    /**
     * @description 答复附件
     */
    replayAttachments?: string[]
    /**
     * @description 回复人
     */
    replayerId?: number
    /**
     * @description 回复人
     */
    replyer?: string
  }
  export interface ConnectQACategoryDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryQACategoryDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类名
     */
    name?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 问题与答复
     */
    qas?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface ConnectQADto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryQADto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 分类
     */
    categoryId?: number
    /**
     * @description 分类
     */
    category?: string
    /**
     * @description 问题
     */
    question?: string
    /**
     * @description 答复
     */
    answer?: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface ConnectOpinionCollectionDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryOpinionCollectionDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 姓名
     */
    name?: string
    /**
     * @description 电话
     */
    phone?: string
    /**
     * @description 邮箱
     */
    mail?: string
    /**
     * @description 需求/问题
     */
    opinion?: string
    /**
     * @description 所属公司
     */
    company?: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 是否已处理
     */
    processed?: boolean
  }
  export interface ConnectParkDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryParkDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 园区名称
     */
    name?: string
    /**
     * @description 园区介绍详情地址
     */
    link?: string
    /**
     * @description 封面图，第一张图作为封面
     */
    covers?: string[]
    /**
     * @description 首页展示信息
     */
    homeIntroduction?: string
    /**
     * @description 园区简介
     */
    introduction?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 在南京地图上的横坐标，相对于305*562底图
     */
    x?: number
    /**
     * @description 在南京地图上的纵坐标，相对于305*562底图
     */
    y?: number
    /**
     * @description 园区介绍文章
     */
    content?: string
    /**
     * @description 园区级别
     */
    level?: string
    /**
     * @description 浏览目的
     */
    purpose?: string[]
    /**
     * @description 所在位置
     */
    location?: string
    /**
     * @description 区域位置
     */
    zoneLocations?: string[]
    /**
     * @description 创立时间
     */
    openingTime?: string
    /**
     * @description 园区面积(㎡)
     */
    area?: string
    /**
     * @description 园区规模
     */
    scale?: string
    /**
     * @description 环境
     */
    environment?: string
    /**
     * @description 物业
     */
    property?: string
    /**
     * @description 税收
     */
    tax?: string
    /**
     * @description 租金
     */
    rent?: string
    /**
     * @description 交通
     */
    traffic?: string[]
    /**
     * @description 信息资源
     */
    informations?: string[]
    /**
     * @description 金融服务
     */
    finance?: string[]
    /**
     * @description 生活服务
     */
    life?: string[]
    /**
     * @description 支柱产业
     */
    pillarIndustry?: string[]
    /**
     * @description 培育产业
     */
    cultivatingIndustry?: string[]
    /**
     * @description 是否是市高新区
     */
    isCentral?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 标签
     */
    tags?: string[]
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string
  }
  export interface ConnectCarrierPlatformTypeDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryCarrierPlatformTypeDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 名称
     */
    name?: string
    /**
     * @description 载体平台
     */
    carrierPlatforms?: string
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
  }
  export interface ConnectCarrierPlatformDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryCarrierPlatformDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 名称
     */
    name?: string
    /**
     * @description 级别 Country - 国家级 Province - 省级 City - 市级
     * @enum Country,Province,City
     */
    level?: string
    /**
     * @description Logo
     */
    logo?: string
    /**
     * @description 链接
     */
    link?: string
    /**
     * @description 类型
     */
    typeId?: number
    /**
     * @description 类型
     */
    type?: string
    /**
     * @description 详情
     */
    description?: string
    /**
     * @description 附件
     */
    attachments?: string[]
    /**
     * @description 特色服务
     */
    service?: string
    /**
     * @description 是否首页展示
     */
    isHomeShow?: boolean
    /**
     * @description 是否只读
     */
    isReadOnly?: boolean
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort?: number
    /**
     * @description 所属栏目
     */
    columnId?: number
    /**
     * @description 所属栏目
     */
    column?: string
    /**
     * @description 所属园区
     */
    parkId?: number
    /**
     * @description 所属园区
     */
    park?: string
  }
  export interface ConnectTableFieldDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryTableFieldDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 字段名(English)
     */
    name?: string
    /**
     * @description 数据库中字段名
     */
    databaseFieldName?: string
    /**
     * @description 类型
     * @enum String,Boolean,Int,BigInt,Float,Decimal,DateTime,Json,Bytes,Unsupported
     */
    type?: string
    /**
     * @description 原始数据库类型
     * @enum dbText,dbChar_x,dbVarChar_n,dbBit_x,dbVarBit,dbUuid,dbXml,dbInet,dbCitext
     */
    nativeType?: string
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 备注
     */
    comment?: string
    /**
     * @description 是否数组
     */
    isList?: boolean
    /**
     * @description 值类型
     * @enum isInteger,isFloat,isUrl,isFile,isIcon,isImage,isColor,isChart,isSwitch,isButton,isBadge,isCode,isJSON,isProgress,isInput,isRadio,isCheckbox,isRichText,isTextArea,isDateTime
     */
    valueType?: string
    /**
     * @description 数字范围
     */
    range?: {}
    /**
     * @description 字符长度
     */
    length?: {}
    /**
     * @description 小数点
     */
    decimal?: number
    defaultValue?: {}
    /**
     * @description 有效值
     */
    validValues?: {}
    /**
     * @description Mock数据
     */
    mock?: string
    /**
     * @description 允许空值
     */
    nullable?: boolean
    /**
     * @description 是否主键
     */
    primary?: boolean
    /**
     * @enum now,cuid,uuid,dbgenerated,autoincrement
     */
    primaryKeyStrategy?: string
    /**
     * @description 是否索引
     */
    index?: boolean
    /**
     * @description 是否必填
     */
    required?: boolean
    /**
     * @description 是否隐藏
     */
    hidden?: boolean
    /**
     * @description 是否只读
     */
    readonly?: boolean
    /**
     * @description 是否系统内置
     */
    systemPreset?: boolean
    /**
     * @description 校验
     */
    validators?: {}
    /**
     * @description 入库转换
     */
    transform?: {}
    /**
     * @description 是否查询不返回
     */
    selectFalse?: boolean
    /**
     * @description 是否不作为查询条件
     */
    ignoreQuery?: boolean
    /**
     * @description 是否禁止创建
     */
    ignoreCreate?: boolean
    /**
     * @description 是否禁止更新
     */
    ignoreUpdate?: boolean
    /**
     * @description 是否禁止删除
     */
    ignoreDelete?: boolean
    /**
     * @description 关联字典项
     */
    relationDictionary?: string
    /**
     * @description 所属表
     */
    tableId?: number
    /**
     * @description 所属表
     */
    table?: string
  }
  export interface ConnectTableDto {
    /**
     * @description ID
     */
    id: number
  }
  export interface QueryTableDto {
    /**
     * @description 每页数量
     * @default 10
     */
    _pageSize?: number
    /**
     * @description 第几页
     * @default 1
     */
    _pageNumber?: number
    /**
     * @description 是否模糊查询 true - 是 false - 否，默认： true
     */
    _like?: boolean
    /**
     * @description 排序（非关系字段），asc - 升序 desc - 降序，example: /path?_sorter=updatedAt:desc,type:asc&amp;_pageNumber=10
     */
    _sorter?: string
    /**
     * @description ID
     */
    id?: number
    /**
     * @description 数据库类型
     * @enum MySQL,MongoDB,PostgreSQL
     */
    databaseType?: string
    /**
     * @description name
     */
    name?: string
    /**
     * @description 数据库表名
     */
    databaseTableName?: string
    /**
     * @description 描述
     */
    description?: string
    /**
     * @description 字段
     */
    fields?: string
    /**
     * @description 是否嵌套结构
     */
    nested?: boolean
    /**
     * @description 嵌套最大深度
     */
    maxNestingDepth?: number
    /**
     * @description 嵌套映射关系
     * @enum OneToOne,OneToMany,ManyToMany
     */
    nestMappingRelation?: string
    /**
     * @description 嵌套父项字段
     */
    nestParentKey?: string
    /**
     * @description 嵌套子项字段
     */
    nestChildrenKey?: string
    /**
     * @description 可删除
     */
    deletable?: boolean
    /**
     * @description 主键
     */
    primaryKeys?: string[]
    /**
     * @description 索引
     */
    indexs?: string[]
    /**
     * @description 同步
     */
    sync?: boolean
    /**
     * @description 状态
     * @enum Doing,Done,Disabled
     */
    status?: string
    /**
     * @description 备份数据
     */
    backup?: boolean
    /**
     * @description 备份策略
     */
    backupStrategy?: {}
    /**
     * @description 生成接口
     */
    generateInterfaces?: {}
    /**
     * @description 版本
     */
    version?: string
  }
  export interface ArticleVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类（多分类）
     */
    categories: string[]
    /**
     * @description 标签（多标签）
     */
    tags: string[]
    /**
     * @description 所属栏目
     */
    columns: string[]
    /**
     * @description 类型: Original - 原创 Reprint - 转载
     * @enum Original,Reprint
     */
    type: string
    /**
     * @description 来源
     */
    source: {}
    /**
     * @description 标题
     */
    title: string
    /**
     * @description Banner
     */
    banner: {}
    /**
     * @description 封面图
     */
    cover: {}
    /**
     * @description 内容
     */
    content: {}
    /**
     * @description 附件
     */
    attachments: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus: string
    /**
     * @description 是否首页展示
     */
    recommend: {}
    /**
     * @description 发布时间
     */
    publishAt: {}
    /**
     * @description 作者（多作者模式）
     */
    authors: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    /**
     * @description 添加者
     */
    user: {}
  }
  export interface ArticleCategoryVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 内容
     */
    articles: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ArticleTagVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标签名
     */
    name: string
    /**
     * @description 颜色
     */
    color: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 此标签下内容
     */
    articles: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface UserVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 用户名，长度 2 ~ 20
     */
    username: string
    /**
     * @description 密码，长度 6 ~ 20
     */
    password: string
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ProfileVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 姓名
     */
    name: {}
    /**
     * @description 邮箱
     */
    email: {}
    /**
     * @description 手机号
     */
    mobile: {}
    /**
     * @description 头像
     */
    avatar: {}
    /**
     * @description 性别
     * @enum Male,Female,Unkown
     */
    gender: string
    /**
     * @description 省/直辖市
     */
    province: {}
    /**
     * @description 市/市辖区
     */
    city: {}
    /**
     * @description 区
     */
    district: {}
    /**
     * @description 出生日期
     */
    birthday: {}
    /**
     * @description 详细地址
     */
    address: {}
    /**
     * @description 邮编
     */
    zipCode: {}
    /**
     * @description 所属用户
     */
    uid: number
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface OrganizationVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 部门名
     */
    name: string
    /**
     * @description 部门简介
     */
    introduction: {}
    /**
     * @description 上级组织
     */
    parent: {}
    /**
     * @description 下级组织
     */
    subordinate: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ColumnVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 栏目层级
     */
    level: number
    /**
     * @description 前缀
     */
    key: string
    /**
     * @description 跳转链接
     */
    url: {}
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 选中显示图标
     */
    activeIcon: {}
    /**
     * @description 选中显示颜色
     */
    activeColor: {}
    /**
     * @description 二级标题背景
     */
    sectionTitleBg: {}
    /**
     * @description 内容类型
     * @enum List,Single
     */
    contentType: string
    /**
     * @description 是否隐藏
     */
    hidden: {}
    /**
     * @description 父栏目
     */
    parent: {}
    /**
     * @description 子栏目
     */
    children: string[]
    /**
     * @description 关联数据
     */
    datas: string[]
    /**
     * @description 关联内容
     */
    articles: string[]
    /**
     * @description 载体平台
     */
    carrierPlatforms: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface DataCategoryVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 数据
     */
    datas: string[]
    /**
     * @description 添加者，可为空，即系统初始化时注入
     */
    user: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface DataTagVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标签名
     */
    name: string
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 颜色
     */
    color: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 此标签下数据
     */
    datas: string[]
    /**
     * @description 建此标签的用户
     */
    user: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface DataVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类
     */
    categories: string[]
    /**
     * @description 标签
     */
    tags: string[]
    /**
     * @description 所属栏目
     */
    columns: string[]
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 内容
     */
    content: {}
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 链接
     */
    url: {}
    /**
     * @description 图片
     */
    images: string[]
    /**
     * @description 审批状态：Pending - 待审核 Published - 已发布 Rejected - 已拒绝 Abandoned - 已废弃
     * @enum Pending,Published,Rejected,Abandoned
     */
    approvalStatus: string
    /**
     * @description 是否需要审批
     */
    requiredApprove: {}
    /**
     * @description 添加数据者，可为空，即系统初始化时注入
     */
    user: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface RoleVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 角色名
     */
    name: string
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 是否系统角色
     */
    isSystemPreset: {}
    /**
     * @description 该角色拥有的管理员
     */
    admins: string[]
    /**
     * @description 拥有的权限
     */
    permissions: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface PermissionVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 权限名
     */
    name: string
    /**
     * @description 权限描述
     */
    description: {}
    /**
     * @description 是否系统权限
     */
    isSystemPreset: {}
    /**
     * @description 归属角色
     */
    roles: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface DictionaryVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description System - 系统 User - 用户
     * @enum System,User
     */
    type: string
    /**
     * @description 字典名
     */
    label: string
    /**
     * @description 字典值
     */
    value: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ConfigVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 配置类型：Base - 基础信息 Rule - 园区推介权重规则 Theme - 主题 Layout - 布局 Environment - 环境变量
     * @enum Base,Rule,Theme,Layout,Environment,ParkPurpose,ParkTraffic,ParkLocation,ParkIndustry
     */
    type: string
    /**
     * @description 配置名
     */
    label: string
    /**
     * @description 配置值
     */
    value: {}
    /**
     * @description 值格式
     * @enum String,Number,Boolean,Array,Object,NestObject,StringValueObject,BooleanValueObject,NumericValueObject,StringArray,NumberArray,BooleanArray,ObjectArray
     */
    format: string
    /**
     * @description 是否只读
     */
    isReadOnly: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface FileVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 在线地址
     */
    url: string
    /**
     * @description 文件后缀
     */
    suffix: string
    /**
     * @description 上传者
     */
    uploader: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface RouteVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 菜单名
     */
    name: string
    /**
     * @description 访问路径
     */
    path: string
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 是否严格匹配
     */
    exact: {}
    /**
     * @description 是否隐藏
     */
    hidden: {}
    /**
     * @description 关联组件或页面
     */
    component: {}
    /**
     * @description 菜单位置
     * @enum Top,Right,Botton,Left
     */
    layout: string
    /**
     * @description 额外配置信息
     */
    config: {}
    /**
     * @description 父路由/父菜单
     */
    parent: {}
    /**
     * @description 子路由/子菜单
     */
    children: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ComponentVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 级别：Page - 页面 Component - 组件级
     * @enum Page,Component
     */
    level: string
    /**
     * @description 来源：System - 系统内置 Custom - 用户自定义
     * @enum System,Custom
     */
    source: string
    /**
     * @description 类型：Form - 表单类 Chart - 可视化类 Layout - 布局类  Biz - 业务类 Default - 默认类型
     * @enum Form,Chart,Layout,Biz,Default
     */
    type: string
    /**
     * @description 组件名
     */
    name: string
    /**
     * @description 中文名
     */
    nameCn: string
    /**
     * @description 分组名
     */
    group: string
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 截图
     */
    screenshot: {}
    /**
     * @description 标签
     */
    tags: {}
    /**
     * @description 属性参数
     */
    props: {}
    /**
     * @description 模板配置项
     */
    templateConfig: {}
    /**
     * @description 配置项
     */
    config: {}
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface TemplateVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 模板名称
     */
    name: string
    /**
     * @description 模板图标
     */
    icon: {}
    /**
     * @description 页面全局配置
     */
    pageProps: {}
    /**
     * @description 组件配置
     */
    components: {}
    /**
     * @description 布局配置
     */
    layouts: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    pageModel: string[]
    pageHistoryModel: string[]
  }
  export interface ApplicationVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 类型
     */
    type: {}
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 当前使用的主题
     */
    theme: {}
    /**
     * @description 配置项
     */
    config: {}
    /**
     * @description 配置项值
     */
    globalProps: {}
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 相对最新版本是否有改动
     */
    changed: boolean
    /**
     * @description 当前版本号
     */
    version: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    /**
     * @description 包含页面
     */
    pages: string[]
    /**
     * @description 版本列表
     */
    versions: string[]
  }
  export interface ApplicationVersionVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 版本号
     */
    version: {}
    /**
     * @description 主题
     */
    theme: {}
    /**
     * @description 应用
     */
    application: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface PageVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 唯一标识
     */
    key: string
    /**
     * @description 类型
     */
    type: {}
    /**
     * @description 图标
     */
    icon: {}
    /**
     * @description 配置项描述
     */
    config: {}
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 分组名
     */
    groupName: {}
    /**
     * @description 相对最新版本是否有改动
     */
    changed: boolean
    /**
     * @description 初始模板
     */
    template: {}
    /**
     * @description 所属应用
     */
    application: {}
    /**
     * @description 所属应用
     */
    parentPage: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    /**
     * @description 变更历史记录
     */
    pageHistory: string[]
    childPages: string[]
  }
  export interface PageHistoryVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 页面全局配置
     */
    pageProps: {}
    /**
     * @description 组件配置
     */
    components: {}
    /**
     * @description 布局配置
     */
    layouts: {}
    /**
     * @description 版本号
     */
    version: {}
    /**
     * @description 所属页面
     */
    page: {}
    /**
     * @description 模板
     */
    template: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface IconVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 图标名
     */
    name: string
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 类名
     */
    className: {}
    /**
     * @description 旋转角度
     */
    rotate: {}
    /**
     * @description 是否有旋转动画
     */
    spin: {}
    /**
     * @description 双色图标的主要颜色
     */
    twoToneColor: {}
    /**
     * @description 样式
     */
    style: {}
    /**
     * @description 配置
     */
    props: {}
    /**
     * @description 自定义渲染组件
     */
    component: {}
    /**
     * @description 来源
     */
    source: {}
    /**
     * @description 示例
     */
    examples: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface RequestLogVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 请求方法
     * @enum GET,PUT,HEAD,POST,PATCH,DELETE,OPTIONS
     */
    method: string
    /**
     * @description 请求地址
     */
    path: string
    /**
     * @description 请求平台
     * @enum Portal,Admin
     */
    platform: string
    /**
     * @description 操作描述
     */
    description: {}
    /**
     * @description 访问 IP
     */
    ip: string
    /**
     * @description IP所在地址
     */
    address: {}
    /**
     * @description 请求头
     */
    headers: {}
    /**
     * @description 解析
     */
    analysis: {}
    /**
     * @description 请求body
     */
    body: {}
    /**
     * @description 响应状态码
     */
    status: {}
    /**
     * @description 是否成功
     */
    success: boolean
    /**
     * @description 请求-响应耗时(ms)
     */
    took: {}
    /**
     * @description 唯一用户标识
     */
    guid: {}
    /**
     * @description 用户名
     */
    username: {}
    /**
     * @description 错误信息
     */
    error: {}
    /**
     * @description 创建时间
     */
    createdAt: string
  }
  export interface VisitStatsVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 统计日期
     */
    date: string
    /**
     * @description 栏目
     */
    column: string
    /**
     * @description 访问数据
     */
    count: number
    /**
     * @description IP数据
     */
    ipCount: number
    /**
     * @description 栏目层级
     */
    level: number
    /**
     * @description 创建时间
     */
    createdAt: string
  }
  export interface SurveyVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 问卷标题
     */
    title: string
    /**
     * @description 描述
     */
    detail: {}
    /**
     * @description 备注
     */
    remark: {}
    /**
     * @description 是否启用
     */
    isEnabled: {}
    /**
     * @description 参与总次数
     */
    total: {}
    /**
     * @description 参与总人数
     */
    pTotal: {}
    /**
     * @description 排序号
     */
    order: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    questions: string[]
    answers: string[]
  }
  export interface QuestionVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 问题文本
     */
    text: string
    /**
     * @description 问题类型：单选/多选
     * @enum Single,Multiple
     */
    type: string
    /**
     * @description 可选选项数量限制
     */
    limit: {}
    /**
     * @description 是否必填
     */
    isRequired: {}
    /**
     * @description 排序号
     */
    order: {}
    /**
     * @description 问卷
     */
    survey: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    choices: string[]
  }
  export interface ChoiceVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 选项文本
     */
    text: {}
    /**
     * @description 选项图片
     */
    image: {}
    /**
     * @description 是否可自定义内容
     */
    isCustom: {}
    /**
     * @description 排序号
     */
    order: {}
    /**
     * @description 问题
     */
    question: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    anserChoices: string[]
  }
  export interface AnswerVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 填报人姓名
     */
    userName: {}
    /**
     * @description 填报IP
     */
    ip: {}
    /**
     * @description 问卷
     */
    survey: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
    choices: string[]
  }
  export interface AnswerChoiceVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 对应答卷
     */
    answer: {}
    /**
     * @description 对应答卷
     */
    choice: {}
    /**
     * @description 自定义内容
     */
    customContent: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface FeedbackVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标题
     */
    title: {}
    /**
     * @description 留言
     */
    feedback: string
    /**
     * @description 留言附件
     */
    attachments: string[]
    /**
     * @description 答复
     */
    replay: {}
    /**
     * @description 答复附件
     */
    replayAttachments: string[]
    /**
     * @description 回复人
     */
    replyer: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface QACategoryVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类名
     */
    name: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 问题与答复
     */
    qas: string[]
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface QAVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 分类
     */
    category: {}
    /**
     * @description 问题
     */
    question: string
    /**
     * @description 答复
     */
    answer: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface OpinionCollectionVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 姓名
     */
    name: string
    /**
     * @description 电话
     */
    phone: string
    /**
     * @description 邮箱
     */
    mail: {}
    /**
     * @description 需求/问题
     */
    opinion: string
    /**
     * @description 所属公司
     */
    company: {}
    /**
     * @description 备注
     */
    remark: {}
    /**
     * @description 是否已处理
     */
    processed: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ParkVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 园区名称
     */
    name: string
    /**
     * @description 园区介绍详情地址
     */
    link: string
    /**
     * @description 封面图，第一张图作为封面
     */
    covers: string[]
    /**
     * @description 首页展示信息
     */
    homeIntroduction: {}
    /**
     * @description 园区简介
     */
    introduction: {}
    /**
     * @description 附件
     */
    attachments: string[]
    /**
     * @description 在南京地图上的横坐标，相对于305*562底图
     */
    x: number
    /**
     * @description 在南京地图上的纵坐标，相对于305*562底图
     */
    y: number
    /**
     * @description 园区介绍文章
     */
    content: {}
    /**
     * @description 园区级别
     */
    level: {}
    /**
     * @description 浏览目的
     */
    purpose: string[]
    /**
     * @description 所在位置
     */
    location: {}
    /**
     * @description 区域位置
     */
    zoneLocations: string[]
    /**
     * @description 创立时间
     */
    openingTime: {}
    /**
     * @description 园区面积(㎡)
     */
    area: {}
    /**
     * @description 园区规模
     */
    scale: {}
    /**
     * @description 环境
     */
    environment: {}
    /**
     * @description 物业
     */
    property: {}
    /**
     * @description 税收
     */
    tax: {}
    /**
     * @description 租金
     */
    rent: {}
    /**
     * @description 交通
     */
    traffic: string[]
    /**
     * @description 信息资源
     */
    informations: string[]
    /**
     * @description 金融服务
     */
    finance: string[]
    /**
     * @description 生活服务
     */
    life: string[]
    /**
     * @description 支柱产业
     */
    pillarIndustry: string[]
    /**
     * @description 培育产业
     */
    cultivatingIndustry: string[]
    /**
     * @description 是否是市高新区
     */
    isCentral: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 标签
     */
    tags: string[]
    /**
     * @description 载体平台
     */
    carrierPlatforms: string[]
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface CarrierPlatformTypeVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 名称
     */
    name: string
    /**
     * @description 载体平台
     */
    carrierPlatforms: string[]
    /**
     * @description 是否只读
     */
    isReadOnly: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface CarrierPlatformVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 名称
     */
    name: string
    /**
     * @description 级别 Country - 国家级 Province - 省级 City - 市级
     * @enum Country,Province,City
     */
    level: string
    /**
     * @description Logo
     */
    logo: {}
    /**
     * @description 链接
     */
    link: {}
    /**
     * @description 类型
     */
    type: {}
    /**
     * @description 详情
     */
    description: {}
    /**
     * @description 附件
     */
    attachments: string[]
    /**
     * @description 特色服务
     */
    service: {}
    /**
     * @description 是否首页展示
     */
    isHomeShow: {}
    /**
     * @description 是否只读
     */
    isReadOnly: {}
    /**
     * @description 是否系统内置
     */
    isSystemPreset: {}
    /**
     * @description 排序，数字越大，优先级越高
     */
    sort: {}
    /**
     * @description 所属栏目
     */
    column: {}
    /**
     * @description 所属园区
     */
    park: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface TableFieldVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 字段名(English)
     */
    name: string
    /**
     * @description 数据库中字段名
     */
    databaseFieldName: {}
    /**
     * @description 类型
     * @enum String,Boolean,Int,BigInt,Float,Decimal,DateTime,Json,Bytes,Unsupported
     */
    type: string
    /**
     * @description 原始数据库类型
     * @enum dbText,dbChar_x,dbVarChar_n,dbBit_x,dbVarBit,dbUuid,dbXml,dbInet,dbCitext
     */
    nativeType: string
    /**
     * @description 标题
     */
    title: {}
    /**
     * @description 备注
     */
    comment: {}
    /**
     * @description 是否数组
     */
    isList: {}
    /**
     * @description 值类型
     * @enum isInteger,isFloat,isUrl,isFile,isIcon,isImage,isColor,isChart,isSwitch,isButton,isBadge,isCode,isJSON,isProgress,isInput,isRadio,isCheckbox,isRichText,isTextArea,isDateTime
     */
    valueType: string
    /**
     * @description 数字范围
     */
    range: {}
    /**
     * @description 字符长度
     */
    length: {}
    /**
     * @description 小数点
     */
    decimal: {}
    defaultValue: {}
    /**
     * @description 有效值
     */
    validValues: {}
    /**
     * @description Mock数据
     */
    mock: {}
    /**
     * @description 允许空值
     */
    nullable: {}
    /**
     * @description 是否主键
     */
    primary: {}
    /**
     * @enum now,cuid,uuid,dbgenerated,autoincrement
     */
    primaryKeyStrategy: string
    /**
     * @description 是否索引
     */
    index: {}
    /**
     * @description 是否必填
     */
    required: {}
    /**
     * @description 是否隐藏
     */
    hidden: {}
    /**
     * @description 是否只读
     */
    readonly: {}
    /**
     * @description 是否系统内置
     */
    systemPreset: {}
    /**
     * @description 校验
     */
    validators: {}
    /**
     * @description 入库转换
     */
    transform: {}
    /**
     * @description 是否查询不返回
     */
    selectFalse: {}
    /**
     * @description 是否不作为查询条件
     */
    ignoreQuery: {}
    /**
     * @description 是否禁止创建
     */
    ignoreCreate: {}
    /**
     * @description 是否禁止更新
     */
    ignoreUpdate: {}
    /**
     * @description 是否禁止删除
     */
    ignoreDelete: {}
    /**
     * @description 关联字典项
     */
    relationDictionary: {}
    /**
     * @description 所属表
     */
    table: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface TableVo {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 数据库类型
     * @enum MySQL,MongoDB,PostgreSQL
     */
    databaseType: string
    /**
     * @description name
     */
    name: string
    /**
     * @description 数据库表名
     */
    databaseTableName: {}
    /**
     * @description 描述
     */
    description: {}
    /**
     * @description 字段
     */
    fields: string[]
    /**
     * @description 是否嵌套结构
     */
    nested: {}
    /**
     * @description 嵌套最大深度
     */
    maxNestingDepth: {}
    /**
     * @description 嵌套映射关系
     * @enum OneToOne,OneToMany,ManyToMany
     */
    nestMappingRelation: string
    /**
     * @description 嵌套父项字段
     */
    nestParentKey: {}
    /**
     * @description 嵌套子项字段
     */
    nestChildrenKey: {}
    /**
     * @description 可删除
     */
    deletable: {}
    /**
     * @description 主键
     */
    primaryKeys: string[]
    /**
     * @description 索引
     */
    indexs: string[]
    /**
     * @description 同步
     */
    sync: {}
    /**
     * @description 状态
     * @enum Doing,Done,Disabled
     */
    status: string
    /**
     * @description 备份数据
     */
    backup: {}
    /**
     * @description 备份策略
     */
    backupStrategy: {}
    /**
     * @description 生成接口
     */
    generateInterfaces: {}
    /**
     * @description 版本
     */
    version: {}
    /**
     * @description 创建时间
     */
    createdAt: string
    /**
     * @description 更新时间
     */
    updatedAt: string
  }
  export interface ItemConfig {
    compName: string
    props?: {}
    grid?: {}
    static?: boolean
    flexible?: boolean
  }
  export interface PageHistoryModelDto {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 页面全局配置
     */
    pageProps?: {}
    /**
     * @description 组件配置
     */
    components?: ApiDocuments.ItemConfig[]
    /**
     * @description 布局配置
     */
    layouts?: {}
    /**
     * @description 版本号
     */
    version: string
  }
  export interface ApplicationModelDto {
    /**
     * @description 应用ID
     */
    id: number
    /**
     * @description 版本号
     */
    version: string
    /**
     * @description 全局配置
     */
    globalProps: {}
  }
  export interface VODConfigGetDto {
    /**
     * @description 文件名
     */
    fileName?: string
    /**
     * @description 文件标题
     */
    title?: string
    /**
     * @description 刷新的视频ID
     */
    videoId?: string
  }
  export interface VODConfigVO {
    /**
     * @description VideoId
     */
    VideoId: string
    /**
     * @description UploadAddress
     */
    UploadAddress: string
    /**
     * @description UploadAuth
     */
    UploadAuth: string
    /**
     * @description RequestId
     */
    RequestId: string
  }
  export interface UploadResultVo {
    /**
     * @description 文件名
     */
    fileName: string
    /**
     * @description 文件地址
     */
    url: string
  }
  export interface ChoiceDto {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 问题ID
     */
    questionId: number
    question: ApiDocuments.QuestionDto
    /**
     * @description 图片
     */
    text?: string
    /**
     * @description 图片
     */
    image?: string
    /**
     * @description 是否可自定义内容，即其他
     * @default false
     */
    isCustom?: boolean
  }
  export interface QuestionDto {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 问卷ID
     */
    surveyId: number
    /**
     * @description 问卷
     */
    survey: ApiDocuments.SurveyDto
    /**
     * @description 内容
     */
    limit?: number
    /**
     * @description 内容
     */
    text?: string
    /**
     * @description 多选/单选
     */
    type?: {}
    /**
     * @description 是否必填
     */
    isRequired?: boolean
    /**
     * @description 选项列表
     */
    choices?: ApiDocuments.ChoiceDto[]
  }
  export interface SurveyDto {
    /**
     * @description ID
     */
    id: number
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 备注
     */
    remark?: string
    /**
     * @description 详情
     */
    detail?: string
    /**
     * @description 是否启用
     * @default true
     */
    isEnabled: boolean
    /**
     * @description 参与总次数
     */
    total?: number
    /**
     * @description 参与总人数
     */
    pTotal?: number
    /**
     * @description 问题列表
     */
    questions?: ApiDocuments.QuestionDto[]
  }
  export interface AnswerDto {
    /**
     * @description 问卷ID
     */
    surveyId: number
    /**
     * @description 问卷
     */
    survey?: ApiDocuments.SurveyDto
    /**
     * @description IP
     */
    ip?: string
    /**
     * @description 填报人姓名
     */
    userName?: string
  }
}
