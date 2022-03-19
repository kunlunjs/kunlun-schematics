import { createFromIconfontCN } from '@ant-design/icons'
import { Switch } from 'antd'
import type { FC } from 'react'
import { useState } from 'react'

interface IsLinkProps {
  onChange?: () => void
}

const LinkSetting: FC<IsLinkProps> = (props: IsLinkProps) => {
  const [obj, setObj] = useState({ loading: false, imageUrl: '' })

  const onChange = (checked: any) => {
    console.log(`switch to ${checked}`)
  }

  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2637867_agmgnj8yyje.js' // 在 iconfont.cn 上生成
  })
  return (
    <div className="flex mb-4 items-center justify-between">
      <div className="flex items-center ">
        <div className="mr-6">是否链接</div>
        <Switch defaultChecked onChange={onChange} />
        <label style={{ paddingLeft: '5px' }}>启用</label>
      </div>
      <div className="rounded-xl flex bg-gray-300 h-6 w-6 items-center justify-center">
        <MyIcon type="icon-relevance" style={{ fontSize: '20px' }} />
      </div>
    </div>
  )
}

export default LinkSetting
