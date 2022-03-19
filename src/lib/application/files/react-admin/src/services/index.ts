/* eslint-disable */
import { requestAdapter } from './a2s.adapter'
import type { RequestBody, RequestQuery } from './a2s.types'
import type { ApiDocuments } from './a2s.namespace'

/**
 * 将参数拆分为 query 和 body
 */
function extract(
  args: RequestBody | any,
  queryList: string[],
  paramList: string[]
) {
  if (args && typeof args === 'object') {
    const query: RequestQuery = {}
    const body: RequestBody = {}
    Object.keys(args).forEach(key => {
      if (queryList.includes(key)) {
        query[key] = (args as RequestBody)[key] as RequestQuery
      } else if (!paramList.includes(key)) {
        body[key] = (args as RequestBody)[key]
      }
    })
    return { query, body }
  }
  return { query: {}, body: {} }
}

/**
 * 路径参数插值
 */
function replacePath(path: string, pathValueMap?: any) {
  return path
    .replace(/\/\{(\w+)}/g, (_, str) => {
      return `/${(pathValueMap as Record<string, string | number>)[str]}`
    })
    .replace(/\/:(\w+)/g, (_, str) => {
      return `/${(pathValueMap as Record<string, string | number>)[str]}`
    })
}

export const services = {
  '全局接口@获取所有接口'(args?: any) {
    return requestAdapter<any>({
      url: replacePath('/api/endpoints', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '登录管理@管理员登录'(args: ApiDocuments.AdminLoginDto) {
    return requestAdapter<any>({
      url: replacePath('/api/admin/login', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '管理员管理@获取管理员列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.AdminVo[]
        }
      }
    >({
      url: replacePath('/api/admin-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'username',
          'password',
          'status',
          'tags',
          'datas',
          'files',
          'categories',
          'feedbackReplys',
          'roleId',
          'role',
          'articles'
        ],
        []
      )
    })
  },
  '管理员管理@获取管理员详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AdminVo
      }
    >({
      url: replacePath('/api/admin/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '管理员管理@更新管理员'(args: ApiDocuments.UpdateAdminDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AdminVo
      }
    >({
      url: replacePath('/api/admin/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '管理员管理@删除管理员'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/admin/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '管理员管理@添加管理员'(args: ApiDocuments.CreateAdminDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AdminVo
      }
    >({
      url: replacePath('/api/admin', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '应用管理@读取应用列表'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/apps', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '应用管理@新增应用'(args: ApiDocuments.CreateApplicationDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/apps', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '应用管理@读取单一应用配置'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/apps/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '应用管理@更新应用'(args: ApiDocuments.UpdateApplicationDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/apps/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '应用管理@删除应用'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/apps/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '应用管理@读取高新区官网应用配置'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ApplicationModelDto
      }
    >({
      url: replacePath('/api/apps-gx', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '应用管理@读取某一应用的历史版本'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/apps-versions/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '应用管理@发布应用'(args: ApiDocuments.PublishApplicationDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/apps-publish', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '内容管理@获取内容列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ArticleVo[]
        }
      }
    >({
      url: replacePath('/api/article-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'categories',
          'tags',
          'columns',
          'type',
          'source',
          'title',
          'banner',
          'cover',
          'content',
          'attachments',
          'sort',
          'approvalStatus',
          'recommend',
          'publishAt',
          'authors',
          'uid',
          'user'
        ],
        []
      )
    })
  },
  '内容管理@获取内容详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleVo
      }
    >({
      url: replacePath('/api/article/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '内容管理@更新内容'(args: ApiDocuments.UpdateArticleDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleVo
      }
    >({
      url: replacePath('/api/article/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '内容管理@删除内容'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/article/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '内容管理@添加内容'(args: ApiDocuments.CreateArticleDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleVo
      }
    >({
      url: replacePath('/api/article', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '内容分类管理@获取内容分类列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ArticleCategoryVo[]
        }
      }
    >({
      url: replacePath('/api/article-category-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'sort',
          'articles'
        ],
        []
      )
    })
  },
  '内容分类管理@获取内容分类详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleCategoryVo
      }
    >({
      url: replacePath('/api/article-category/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '内容分类管理@更新内容分类'(args: ApiDocuments.UpdateArticleCategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleCategoryVo
      }
    >({
      url: replacePath('/api/article-category/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '内容分类管理@删除内容分类'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/article-category/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '内容分类管理@添加内容分类'(args: ApiDocuments.CreateArticleCategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleCategoryVo
      }
    >({
      url: replacePath('/api/article-category', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '内容标签管理@获取内容标签列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ArticleTagVo[]
        }
      }
    >({
      url: replacePath('/api/article-tag-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'color',
          'sort',
          'articles'
        ],
        []
      )
    })
  },
  '内容标签管理@获取内容标签详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleTagVo
      }
    >({
      url: replacePath('/api/article-tag/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '内容标签管理@更新内容标签'(args: ApiDocuments.UpdateArticleTagDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleTagVo
      }
    >({
      url: replacePath('/api/article-tag/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '内容标签管理@删除内容标签'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/article-tag/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '内容标签管理@添加内容标签'(args: ApiDocuments.CreateArticleTagDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ArticleTagVo
      }
    >({
      url: replacePath('/api/article-tag', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '载体平台管理@获取载体平台列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.CarrierPlatformVo[]
        }
      }
    >({
      url: replacePath('/api/carrier-platform-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'level',
          'logo',
          'link',
          'typeId',
          'type',
          'description',
          'attachments',
          'service',
          'isHomeShow',
          'isReadOnly',
          'isSystemPreset',
          'sort',
          'columnId',
          'column',
          'parkId',
          'park'
        ],
        []
      )
    })
  },
  '载体平台管理@获取载体平台详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformVo
      }
    >({
      url: replacePath('/api/carrier-platform/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '载体平台管理@更新载体平台'(args: ApiDocuments.UpdateCarrierPlatformDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformVo
      }
    >({
      url: replacePath('/api/carrier-platform/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '载体平台管理@删除载体平台'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/carrier-platform/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '载体平台管理@添加载体平台'(args: ApiDocuments.CreateCarrierPlatformDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformVo
      }
    >({
      url: replacePath('/api/carrier-platform', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '载体平台类型管理@获取载体平台类型列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.CarrierPlatformTypeVo[]
        }
      }
    >({
      url: replacePath('/api/carrier-platform-type-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'carrierPlatforms',
          'isReadOnly',
          'isSystemPreset',
          'sort'
        ],
        []
      )
    })
  },
  '载体平台类型管理@获取载体平台类型详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformTypeVo
      }
    >({
      url: replacePath('/api/carrier-platform-type/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '载体平台类型管理@更新载体平台类型'(
    args: ApiDocuments.UpdateCarrierPlatformTypeDto
  ) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformTypeVo
      }
    >({
      url: replacePath('/api/carrier-platform-type/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '载体平台类型管理@删除载体平台类型'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/carrier-platform-type/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '载体平台类型管理@添加载体平台类型'(
    args: ApiDocuments.CreateCarrierPlatformTypeDto
  ) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.CarrierPlatformTypeVo
      }
    >({
      url: replacePath('/api/carrier-platform-type', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '栏目管理@获取栏目列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ColumnVo[]
        }
      }
    >({
      url: replacePath('/api/column-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'title',
          'level',
          'key',
          'url',
          'icon',
          'activeIcon',
          'activeColor',
          'sectionTitleBg',
          'contentType',
          'hidden',
          'parentId',
          'parent',
          'children',
          'datas',
          'articles',
          'carrierPlatforms',
          'sort'
        ],
        []
      )
    })
  },
  '栏目管理@获取栏目详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ColumnVo
      }
    >({
      url: replacePath('/api/column/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '栏目管理@更新栏目'(args: ApiDocuments.UpdateColumnDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ColumnVo
      }
    >({
      url: replacePath('/api/column/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '栏目管理@删除栏目'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/column/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '栏目管理@添加栏目'(args: ApiDocuments.CreateColumnDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ColumnVo
      }
    >({
      url: replacePath('/api/column', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '组件管理@读取组件列表'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/components', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '组件管理@新增组件'(args: ApiDocuments.CreateComponentDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/components', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '组件管理@读取单一组件配置'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/components/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '组件管理@更新组件'(args: ApiDocuments.UpdateComponentDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/components/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '组件管理@删除组件'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/components/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '配置管理@获取配置列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
     */
    type?: string
    /**
     * @description 配置名
     */
    label?: string
    /**
     * @description 值格式
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ConfigVo[]
        }
      }
    >({
      url: replacePath('/api/config-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'type',
          'label',
          'format',
          'isReadOnly',
          'isSystemPreset'
        ],
        []
      )
    })
  },
  '配置管理@获取配置详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ConfigVo
      }
    >({
      url: replacePath('/api/config/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '配置管理@更新配置'(args: ApiDocuments.UpdateConfigDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ConfigVo
      }
    >({
      url: replacePath('/api/config/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '配置管理@删除配置'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/config/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '配置管理@添加配置'(args: ApiDocuments.CreateConfigDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ConfigVo
      }
    >({
      url: replacePath('/api/config', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '数据管理@获取数据列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.DataVo[]
        }
      }
    >({
      url: replacePath('/api/data-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'categories',
          'tags',
          'columns',
          'title',
          'description',
          'content',
          'icon',
          'url',
          'images',
          'approvalStatus',
          'requiredApprove',
          'uid',
          'user',
          'sort'
        ],
        []
      )
    })
  },
  '数据管理@获取数据详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataVo
      }
    >({
      url: replacePath('/api/data/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '数据管理@更新数据'(args: ApiDocuments.UpdateDataDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataVo
      }
    >({
      url: replacePath('/api/data/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '数据管理@删除数据'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/data/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '数据管理@添加数据'(args: ApiDocuments.CreateDataDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataVo
      }
    >({
      url: replacePath('/api/data', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '数据分类管理@获取数据分类列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.DataCategoryVo[]
        }
      }
    >({
      url: replacePath('/api/data-category-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'description',
          'isSystemPreset',
          'sort',
          'datas',
          'uid',
          'user'
        ],
        []
      )
    })
  },
  '数据分类管理@获取数据分类详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataCategoryVo
      }
    >({
      url: replacePath('/api/data-category/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '数据分类管理@更新数据分类'(args: ApiDocuments.UpdateDataCategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataCategoryVo
      }
    >({
      url: replacePath('/api/data-category/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '数据分类管理@删除数据分类'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/data-category/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '数据分类管理@添加数据分类'(args: ApiDocuments.CreateDataCategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataCategoryVo
      }
    >({
      url: replacePath('/api/data-category', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '数据标签管理@获取数据标签列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.DataTagVo[]
        }
      }
    >({
      url: replacePath('/api/data-tag-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'description',
          'color',
          'isSystemPreset',
          'sort',
          'datas',
          'uid',
          'user'
        ],
        []
      )
    })
  },
  '数据标签管理@获取数据标签详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataTagVo
      }
    >({
      url: replacePath('/api/data-tag/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '数据标签管理@更新数据标签'(args: ApiDocuments.UpdateDataTagDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataTagVo
      }
    >({
      url: replacePath('/api/data-tag/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '数据标签管理@删除数据标签'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/data-tag/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '数据标签管理@添加数据标签'(args: ApiDocuments.CreateDataTagDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DataTagVo
      }
    >({
      url: replacePath('/api/data-tag', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '字典管理@获取字典列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
     */
    type?: string
    /**
     * @description 字典名
     */
    label?: string
    /**
     * @description 是否系统内置
     */
    isSystemPreset?: boolean
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.DictionaryVo[]
        }
      }
    >({
      url: replacePath('/api/dictionary-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'type',
          'label',
          'isSystemPreset'
        ],
        []
      )
    })
  },
  '字典管理@获取字典详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DictionaryVo
      }
    >({
      url: replacePath('/api/dictionary/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '字典管理@更新字典'(args: ApiDocuments.UpdateDictionaryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DictionaryVo
      }
    >({
      url: replacePath('/api/dictionary/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '字典管理@删除字典'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/dictionary/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '字典管理@添加字典'(args: ApiDocuments.CreateDictionaryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.DictionaryVo
      }
    >({
      url: replacePath('/api/dictionary', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '留言管理@获取留言列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.FeedbackVo[]
        }
      }
    >({
      url: replacePath('/api/feedback-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'title',
          'feedback',
          'attachments',
          'replay',
          'replayAttachments',
          'replayerId',
          'replyer'
        ],
        []
      )
    })
  },
  '留言管理@获取留言详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.FeedbackVo
      }
    >({
      url: replacePath('/api/feedback/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '留言管理@更新留言'(args: ApiDocuments.UpdateFeedbackDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.FeedbackVo
      }
    >({
      url: replacePath('/api/feedback/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '留言管理@删除留言'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/feedback/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '留言管理@添加留言'(args: ApiDocuments.CreateFeedbackDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.FeedbackVo
      }
    >({
      url: replacePath('/api/feedback', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '图标管理@获取图标列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.IconVo[]
        }
      }
    >({
      url: replacePath('/api/icon-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'description',
          'className',
          'rotate',
          'spin',
          'twoToneColor',
          'component',
          'source',
          'examples'
        ],
        []
      )
    })
  },
  '图标管理@获取图标详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.IconVo
      }
    >({
      url: replacePath('/api/icon/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '图标管理@更新图标'(args: ApiDocuments.UpdateIconDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.IconVo
      }
    >({
      url: replacePath('/api/icon/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '图标管理@删除图标'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/icon/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '图标管理@添加图标'(args: ApiDocuments.CreateIconDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.IconVo
      }
    >({
      url: replacePath('/api/icon', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '意见收集管理@获取意见收集列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.OpinionCollectionVo[]
        }
      }
    >({
      url: replacePath('/api/opinion-collection-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'phone',
          'mail',
          'opinion',
          'company',
          'remark',
          'processed'
        ],
        []
      )
    })
  },
  '意见收集管理@获取意见收集详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.OpinionCollectionVo
      }
    >({
      url: replacePath('/api/opinion-collection/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '意见收集管理@更新意见收集'(args: ApiDocuments.UpdateOpinionCollectionDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.OpinionCollectionVo
      }
    >({
      url: replacePath('/api/opinion-collection/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '意见收集管理@删除意见收集'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/opinion-collection/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '意见收集管理@添加意见收集'(args: ApiDocuments.CreateOpinionCollectionDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.OpinionCollectionVo
      }
    >({
      url: replacePath('/api/opinion-collection', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '页面管理@读取页面列表'(args: {
    /**
     * @description 所属应用ID
     */
    appId?: number
    /**
     * @description 唯一标识
     */
    key?: string
  }) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/pages', args),
      method: 'GET',
      ...extract(args, ['appId', 'key'], [])
    })
  },
  '页面管理@新增页面'(args: ApiDocuments.CreatePageDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/pages', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '页面管理@读取最新页面配置'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/pages/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '页面管理@更新页面'(args: ApiDocuments.UpdatePageLocalDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/pages/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '页面管理@删除页面'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/pages/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '页面管理@读取页面历史记录'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/pages-history/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '页面管理@新增页面历史记录'(args: ApiDocuments.CreatePageHistoryDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/pages-history', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '页面管理@读取已发布的页面配置'(args: {
    /**
     * @description 版本号(没有则默认最新版)
     */
    version?: string
    /**
     * @description 页面唯一标识
     */
    key?: string
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PageHistoryModelDto
      }
    >({
      url: replacePath('/api/pages-published/{id}', args),
      method: 'GET',
      ...extract(args, ['version', 'key'], [])
    })
  },
  '页面管理@根据唯一标识读取最新页面配置'(args: {
    /**
     * @description 所属应用ID
     */
    appId?: number
    /**
     * @description 唯一标识
     */
    key?: string
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PageHistoryModelDto
      }
    >({
      url: replacePath('/api/pages-by-key', args),
      method: 'GET',
      ...extract(args, ['appId', 'key'], [])
    })
  },
  '页面管理@根据唯一标识读取已发布的页面配置'(args: {
    /**
     * @description 版本号(没有则默认最新版)
     */
    version?: string
    /**
     * @description 页面唯一标识
     */
    key?: string
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PageHistoryModelDto
      }
    >({
      url: replacePath('/api/pages-published-by-key', args),
      method: 'GET',
      ...extract(args, ['version', 'key'], [])
    })
  },
  '园区管理@获取园区推荐列表'(args: {
    /**
     * @description 浏览目的
     */
    purpose?: string
    /**
     * @description 交通
     */
    traffic?: string
    /**
     * @description 地点
     */
    location?: string
    /**
     * @description 产业
     */
    industry?: string
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ParkVo
      }
    >({
      url: replacePath('/api/parks/recommend', args),
      method: 'GET',
      ...extract(args, ['purpose', 'traffic', 'location', 'industry'], [])
    })
  },
  '园区管理@获取园区列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.ParkVo[]
        }
      }
    >({
      url: replacePath('/api/park-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'link',
          'covers',
          'homeIntroduction',
          'introduction',
          'attachments',
          'x',
          'y',
          'content',
          'level',
          'purpose',
          'location',
          'zoneLocations',
          'openingTime',
          'area',
          'scale',
          'environment',
          'property',
          'tax',
          'rent',
          'traffic',
          'informations',
          'finance',
          'life',
          'pillarIndustry',
          'cultivatingIndustry',
          'isCentral',
          'sort',
          'tags',
          'carrierPlatforms'
        ],
        []
      )
    })
  },
  '园区管理@获取园区详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ParkVo
      }
    >({
      url: replacePath('/api/park/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '园区管理@更新园区'(args: ApiDocuments.UpdateParkDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ParkVo
      }
    >({
      url: replacePath('/api/park/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '园区管理@删除园区'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/park/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '园区管理@添加园区'(args: ApiDocuments.CreateParkDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.ParkVo
      }
    >({
      url: replacePath('/api/park', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '权限管理@获取权限列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.PermissionVo[]
        }
      }
    >({
      url: replacePath('/api/permission-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'description',
          'isSystemPreset',
          'roles'
        ],
        []
      )
    })
  },
  '权限管理@获取权限详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PermissionVo
      }
    >({
      url: replacePath('/api/permission/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '权限管理@更新权限'(args: ApiDocuments.UpdatePermissionDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PermissionVo
      }
    >({
      url: replacePath('/api/permission/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '权限管理@删除权限'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/permission/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '权限管理@添加权限'(args: ApiDocuments.CreatePermissionDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.PermissionVo
      }
    >({
      url: replacePath('/api/permission', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '常见问题管理@获取常见问题列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.QAVo[]
        }
      }
    >({
      url: replacePath('/api/qa-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'categoryId',
          'category',
          'question',
          'answer',
          'sort'
        ],
        []
      )
    })
  },
  '常见问题管理@获取常见问题详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QAVo
      }
    >({
      url: replacePath('/api/qa/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '常见问题管理@更新常见问题'(args: ApiDocuments.UpdateQADto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QAVo
      }
    >({
      url: replacePath('/api/qa/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '常见问题管理@删除常见问题'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/qa/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '常见问题管理@添加常见问题'(args: ApiDocuments.CreateQADto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QAVo
      }
    >({
      url: replacePath('/api/qa', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '常见问题分类管理@获取常见问题分类列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.QACategoryVo[]
        }
      }
    >({
      url: replacePath('/api/qacategory-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'isSystemPreset',
          'qas',
          'sort'
        ],
        []
      )
    })
  },
  '常见问题分类管理@获取常见问题分类详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QACategoryVo
      }
    >({
      url: replacePath('/api/qacategory/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '常见问题分类管理@更新常见问题分类'(args: ApiDocuments.UpdateQACategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QACategoryVo
      }
    >({
      url: replacePath('/api/qacategory/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '常见问题分类管理@删除常见问题分类'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/qacategory/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '常见问题分类管理@添加常见问题分类'(args: ApiDocuments.CreateQACategoryDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.QACategoryVo
      }
    >({
      url: replacePath('/api/qacategory', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '请求日志管理@获取请求日志列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
     */
    method?: string
    /**
     * @description 请求地址
     */
    path?: string
    /**
     * @description 请求平台
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.RequestLogVo[]
        }
      }
    >({
      url: replacePath('/api/request-log-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'method',
          'path',
          'platform',
          'description',
          'ip',
          'status',
          'success',
          'took',
          'guid',
          'username'
        ],
        []
      )
    })
  },
  '文件管理@文件上传'(args: ApiDocuments.UploadDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.UploadResultVo
      }
    >({
      url: replacePath('/api/files/upload', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '角色管理@获取角色列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.RoleVo[]
        }
      }
    >({
      url: replacePath('/api/role-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'description',
          'isSystemPreset',
          'admins',
          'permissions'
        ],
        []
      )
    })
  },
  '角色管理@获取角色详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.RoleVo
      }
    >({
      url: replacePath('/api/role/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '角色管理@更新角色'(args: ApiDocuments.UpdateRoleDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.RoleVo
      }
    >({
      url: replacePath('/api/role/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '角色管理@删除角色'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/role/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '角色管理@添加角色'(args: ApiDocuments.CreateRoleDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.RoleVo
      }
    >({
      url: replacePath('/api/role', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '问卷管理@新增问卷'(args: ApiDocuments.NCreateSurveyDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.SurveyDto
      }
    >({
      url: replacePath('/api/surveys', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '问卷管理@查询问卷列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.SurveyDto[]
      }
    >({
      url: replacePath('/api/surveys', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'title',
          'detail',
          'remark',
          'isEnabled',
          'total',
          'pTotal',
          'order',
          'questions',
          'answers'
        ],
        []
      )
    })
  },
  '问卷管理@查询单个问卷详情'(args: { id: number }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.SurveyDto
      }
    >({
      url: replacePath('/api/surveys/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@更改问卷'(
    args: {
      id: number
    } & ApiDocuments.NCreateSurveyDto
  ) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.SurveyDto
      }
    >({
      url: replacePath('/api/surveys/{id}', args),
      method: 'PUT',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@删除问卷'(args: { id: number }) {
    return requestAdapter<any>({
      url: replacePath('/api/surveys/{id}', args),
      method: 'DELETE',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@查询单个问卷统计信息'(args: { id: number }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.SurveyDto
      }
    >({
      url: replacePath('/api/surveys-stats/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@强制删除问卷'(args: { id: number }) {
    return requestAdapter<any>({
      url: replacePath('/api/surveys-force/{id}', args),
      method: 'DELETE',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@回答问卷'(args: ApiDocuments.NCreateAnswerDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AnswerDto
      }
    >({
      url: replacePath('/api/survey-answer', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '问卷管理@读取问卷反馈列表'(args: { id: number }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AnswerDto[]
      }
    >({
      url: replacePath('/api/survey-answers/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '问卷管理@读取选项自定义内容'(args: { id: number }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.AnswerDto[]
      }
    >({
      url: replacePath('/api/survey-choice/{id}', args),
      method: 'GET',
      ...extract(args, [], ['id'])
    })
  },
  '数据表管理@获取数据表列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
     */
    status?: string
    /**
     * @description 备份数据
     */
    backup?: boolean
    /**
     * @description 版本
     */
    version?: string
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.TableVo[]
        }
      }
    >({
      url: replacePath('/api/table-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'databaseType',
          'name',
          'databaseTableName',
          'description',
          'fields',
          'nested',
          'maxNestingDepth',
          'nestMappingRelation',
          'nestParentKey',
          'nestChildrenKey',
          'deletable',
          'primaryKeys',
          'indexs',
          'sync',
          'status',
          'backup',
          'version'
        ],
        []
      )
    })
  },
  '数据表管理@获取数据表详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableVo
      }
    >({
      url: replacePath('/api/table/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '数据表管理@更新数据表'(args: ApiDocuments.UpdateTableDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableVo
      }
    >({
      url: replacePath('/api/table/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '数据表管理@删除数据表'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/table/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '数据表管理@添加数据表'(args: ApiDocuments.CreateTableDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableVo
      }
    >({
      url: replacePath('/api/table', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '表字段管理@获取表字段列表'(args: {
    /**
     * @description 每页数量
     */
    _pageSize?: number
    /**
     * @description 第几页
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
     */
    type?: string
    /**
     * @description 原始数据库类型
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
     */
    valueType?: string
    /**
     * @description 小数点
     */
    decimal?: number
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.TableFieldVo[]
        }
      }
    >({
      url: replacePath('/api/table-field-list', args),
      method: 'GET',
      ...extract(
        args,
        [
          '_pageSize',
          '_pageNumber',
          '_like',
          '_sorter',
          'id',
          'name',
          'databaseFieldName',
          'type',
          'nativeType',
          'title',
          'comment',
          'isList',
          'valueType',
          'decimal',
          'mock',
          'nullable',
          'primary',
          'primaryKeyStrategy',
          'index',
          'required',
          'hidden',
          'readonly',
          'systemPreset',
          'selectFalse',
          'ignoreQuery',
          'ignoreCreate',
          'ignoreUpdate',
          'ignoreDelete',
          'relationDictionary',
          'tableId',
          'table'
        ],
        []
      )
    })
  },
  '表字段管理@获取表字段详情'(args?: any) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableFieldVo
      }
    >({
      url: replacePath('/api/table-field/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '表字段管理@更新表字段'(args: ApiDocuments.UpdateTableFieldDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableFieldVo
      }
    >({
      url: replacePath('/api/table-field/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '表字段管理@删除表字段'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/table-field/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '表字段管理@添加表字段'(args: ApiDocuments.CreateTableFieldDto) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.TableFieldVo
      }
    >({
      url: replacePath('/api/table-field', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '模板管理@读取模板列表'(args?: any) {
    return requestAdapter<{}[]>({
      url: replacePath('/api/templates', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '模板管理@新增模板'(args: ApiDocuments.CreateTemplateDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/templates', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '模板管理@读取单一模板配置'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/templates/{id}', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  },
  '模板管理@更新模板'(args: ApiDocuments.UpdateTemplateDto) {
    return requestAdapter<{}>({
      url: replacePath('/api/templates/{id}', args),
      method: 'PUT',
      ...extract(args, [], [])
    })
  },
  '模板管理@删除模板'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/templates/{id}', args),
      method: 'DELETE',
      ...extract(args, [], [])
    })
  },
  '模板管理@同步模板内容到所有页面'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/templates-async/{id}', args),
      method: 'POST',
      ...extract(args, [], [])
    })
  },
  '访问统计数据管理@获取访问统计数据列表'(args: {
    /**
     * @description 统计开始日期
     */
    dateStart?: string
    /**
     * @description 统计结束日期
     */
    dateEnd?: string
    /**
     * @description 栏目
     */
    column?: string
    /**
     * @description 访问数据
     */
    count?: number
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: {
          /**
           * @description 总数
           */
          total?: number
          items?: ApiDocuments.VisitStatsVo[]
        }
      }
    >({
      url: replacePath('/api/visit-stats-list', args),
      method: 'GET',
      ...extract(args, ['dateStart', 'dateEnd', 'column', 'count'], [])
    })
  },
  'VOD管理@获取VOD上传配置'(args: {
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
  }) {
    return requestAdapter<
      ApiDocuments.ApiResponseVo & {
        data?: ApiDocuments.VODConfigVO
      }
    >({
      url: replacePath('/api/vod/config', args),
      method: 'GET',
      ...extract(args, ['fileName', 'title', 'videoId'], [])
    })
  },
  'VOD管理@根据videoId获取视频播放凭证'(args?: any) {
    return requestAdapter<{}>({
      url: replacePath('/api/vod/{id}/auth', args),
      method: 'GET',
      ...extract(args, [], [])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<
  typeof services[T]
>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<
  ReturnType<typeof services[T]>
>['data']
