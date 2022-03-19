import { Card, Space, Steps, Typography } from 'antd'
import type { FC } from 'react'

const { Step } = Steps
const { Title, Paragraph } = Typography

interface HomeProps {}

const steps = [
  '新建页面',
  '选择模板/组件工厂',
  '选择/新建关联菜单',
  '生成原始页面',
  '配置页面要素',
  '连接/Mock数据源',
  '保存/预览/下载页面'
]
const factories = [
  '卡片',
  '表单',
  '图表',
  '流程',
  '表格',
  '可视化大屏',
  '文件/文件夹'
]
const scenes = [
  '投票',
  '调查问卷',
  '文章管理',
  '资产管理',
  '权限管理',
  '用户管理',
  '角色管理',
  '组织管理',
  '菜单管理',
  '配置管理',
  '文件管理',
  '字典管理',
  '日志管理',
  '系统监控'
]
const frameworks = [
  'React',
  'NestJS',
  'Prisma',
  'PostgreSQL',
  'Redis',
  'Jest',
  'TypeScript',
  'RBAC',
  '高度配置化的数据建模',
  '灵活的组件拖拽能力',
  '丰富的内置组件',
  '支持第三方组件接入',
  '测试覆盖率高',
  '类型安全保障',
  '强大的数据处理能力',
  '可接入多种数据源',
  '完善的服务可用性保障',
  '活跃的维护状态',
  '完全开源'
]

const Home: FC<HomeProps> = () => {
  return (
    <div>
      <Typography>
        <Title level={3}>构建页面流程</Title>
        <Paragraph>
          <Steps size="small">
            {steps.map(i => (
              <Step key={i} title={i} />
            ))}
          </Steps>
        </Paragraph>
      </Typography>
      <Space direction="vertical">
        <Card title="模板/组件工厂">
          {factories.map(i => (
            <Card.Grid
              key={i}
              className="cursor-pointer text-center text-xs w-6/12 hover:bg-green-100"
            >
              {i}
            </Card.Grid>
          ))}
        </Card>
        <Card title="典型业务场景">
          {scenes.map(i => (
            <Card.Grid
              key={i}
              className="cursor-pointer text-center text-xs w-6/12 hover:bg-green-100"
            >
              {i}
            </Card.Grid>
          ))}
        </Card>
        <Card title="技术基座/架构">
          {frameworks.map(i => (
            <Card.Grid
              key={i}
              className="cursor-pointer text-center text-xs w-6/12 hover:bg-green-100"
            >
              {i}
            </Card.Grid>
          ))}
        </Card>
      </Space>
    </div>
  )
}

export default Home
