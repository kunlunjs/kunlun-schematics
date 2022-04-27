// Invoked on the commit-msg git hook

const { readFileSync } = require('fs')
const chalk = require('chalk')

// process.argv: [ts-node, verify-commit-msg.ts, .git/COMMIT_EDITMSG]
const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const pre = [
  'ci', // CI/CD Travis、Jenkins、GitLab CI、Circle等
  'dx', // dx
  'wip', // 开发
  'fix', // 问题修复
  'feat', // 功能
  'docs', // 文档
  'deps', // 依赖
  'perf', // 性能
  'test', // 测试
  'build', // 构建
  'chore', // 日常事务
  'types', // 类型声明
  'style', // 格式化
  'sample', // 案例
  'release', // 发布 npm package
  'refactor', // 重构
  'workflow' // github workflow
]
const commitRE = new RegExp(
  `^(revert: )?(${pre.join('|')})(\\(.+\\))?: .{1,50}`
)

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed(chalk.white(' ERROR '))} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat: add 'comments' option`)}\n` +
      `    ${chalk.green(`fix: handle events on blur (close #28)`)}\n\n` +
      chalk.red(
        `  See https://github.com/turing-fe/kunlun-fabric/blob/main/src/verify-commit-msg.ts for more details.\n`
      )
  )
  process.exit(1)
}
