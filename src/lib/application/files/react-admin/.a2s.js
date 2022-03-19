/* eslint-disable */
/** @type {import('@zidong/a2s/dist/config').DataSourceConfig} */
module.exports = {
  // 数据源类型
  dataSourceOptions: {
    /** @type {import('@zidong/a2s/dist/plugins').OpenAPIDataSourceOptions} */
    openapi: {
      // 数据源地址
      // apiUrl: process.env.PROXY_URL || 'http://xx.xx.xx.xx/api/swagger-json'
      apiUrl: 'http://localhost:3000/swagger-json'
      // basicAuth: {
      //   username: '',
      //   password: ''
      // },
      // headers: {
      //   Cookie: 'xxx=xxx; xxx=xxx;'
      // }
    }
  },
  /** @type {import('@zidong/a2s/dist/plugins').YAPIDataSourceOptions} */
  // dataSourceOptions: {
  //   yapi: {
  //     apiUrl: 'https://apistore.ainanjing.org.cn/',
  //     projectId: 166,
  //     token: '8071ba8808f6977e5bc0e3739ca3488bc8dafc06bf171ff81af357c8533b105f'
  //   }
  // },
  // 生成的service相关文件的存储位置
  outputPath: 'src/services',
  // 是否覆盖固定生成的几个文件？一般不建议取消，保持文件最新
  overwrite: true,
  // [Optional, default: 'axios'] 基于什么框架去生成代码
  requestAdapter: 'axios',
  // [Optional, default: true] 是否对api的分组名和名称进行trim，减少空格
  trim: true,
  // [Optional, default: ['a2s.adapter.ts']] 生成时可忽略的文件集合，当 a2s.adapter.ts 文件根据业务发生变更后需要ignore
  // eg: ['a2s.adapter.ts']
  ignoreFiles: ['a2s.adapter.ts', 'a2s.types.ts'],
  // [Optional, default: null] 解构response返回的数据层级，一般用于后端返回的数据有一层固定的包裹，比如 { data: {}, message: '', err_code: '' } 这种情况，此时设置为 'data' 将自动解构到 data 里面的具体数据，如果有多层包裹，请使用数组
  dataPath: 'data'
}
