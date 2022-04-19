// @ts-check
const prettierConfig = require('@kunlunjs/fabric/dist/prettier')

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...prettierConfig,
  // 如果使用了 tailwindcss，默认查找 prettier 配置文件同目录的 tailwindcss.config.js 文件，在其它位置则需指定，如
  tailwindConfig: './packages/web/tailwind.config.js'
}
