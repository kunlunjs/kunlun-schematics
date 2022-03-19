import { createFromIconfontCN } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Form, Input, Button, message } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import a1 from '@/assets/huoju.png'
import a2 from '@/assets/left.png'
import Icon from '@/components/Icon'
import './login.less'
import { services } from '@/services'

interface LoginProps {}

const MyIcon1 = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2973062_rvglqzjmc1.js' // 在 iconfont.cn 上生成
})
const MyIcon2 = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2973062_rvglqzjmc1.js' // 在 iconfont.cn 上生成
})

const Login: FC<LoginProps> = () => {
  const history = useHistory()
  const [iconshow, setIconShow] = useState(true)
  const [status, setStatus] = useState(false)
  const { loading, run } = useRequest(
    (username: string, password: string) => {
      return services['登录管理@管理员登录']({
        username,
        password
      })
    },
    {
      manual: true,
      onSuccess(res: any) {
        if (res.success && res?.data?.accessToken) {
          const { data } = res
          localStorage.setItem('token', data?.accessToken)
          localStorage.setItem('username', data?.username)
          localStorage.setItem('role.name', data?.role?.name)
          history.push('/')
        } else {
          message.warn(res?.message || '用户名或密码错误')
        }
      }
    }
  )

  const handleFinish = useCallback(
    (values: { username: string; password: string }) => {
      run(values.username, values.password)
    },
    []
  )
  const handleFinishFailed = useCallback((error: any) => {
    console.log(error)
  }, [])
  const onFormLayoutChange = (values: any, allValues: any) => {
    setStatus(allValues.username && allValues.password)
  }

  return (
    <div className="flex  h-[100vh] w-[100%] login-total-content">
      <div className="pt-12px login-left">
        <div className="flex login-left-header-top justify-between">
          <div>
            <img
              src={a1}
              style={{ width: '27px', height: '32px', marginLeft: '32px' }}
            />
            <span className="ml-32px login-left-header-title">
              南京高新区高质量发展信息化基础平台
            </span>
          </div>
          <div
            className="pr-24px login-left-addicon"
            onClick={() => {
              window.location.href =
                'https://portal.nanjingtech.ainanjing.org.cn/'
            }}
          >
            返回官网
          </div>
        </div>
        <div className="flex h-[100%] w-[100%] justify-center items-center login">
          <Form
            name="basic"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            className="border-black  bg-#b0cfea w-[28%] !px-10 !pt-10 !pb-2"
            autoComplete="off"
            onValuesChange={onFormLayoutChange}
          >
            <h2 className="form-title">Hi, 欢迎登录</h2>

            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
              wrapperCol={{ span: 24 }}
            >
              <Input
                prefix={<Icon name="UserOutlined" />}
                placeholder="请输入用户名"
                className="mb-16px"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              wrapperCol={{ span: 24 }}
            >
              <Input
                type={iconshow ? 'password' : ''}
                prefix={<Icon name="LockOutlined" />}
                placeholder="请输入密码"
                allowClear
                suffix={
                  iconshow ? (
                    <MyIcon1
                      type="icon-biyanjing"
                      style={{ fontSize: '17px', paddingLeft: '8px' }}
                      onClick={() => {
                        setIconShow(false)
                      }}
                    />
                  ) : (
                    <MyIcon2
                      type="icon-yanjing"
                      style={{ fontSize: '17px', paddingLeft: '8px' }}
                      onClick={() => {
                        setIconShow(true)
                      }}
                    />
                  )
                }
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="h-5 w-[100%]"
                loading={loading}
                disabled={!status}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="login-right">
        <img src={a2} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}

export default Login
