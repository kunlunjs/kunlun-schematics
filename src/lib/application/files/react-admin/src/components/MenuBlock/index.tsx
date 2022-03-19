import {
  HolderOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  createFromIconfontCN
} from '@ant-design/icons'
import { Input } from 'antd'
import { Switch, message } from 'antd'
import { useState } from 'react'
import type { FC } from 'react'
import Upload from '../KLUpload/index'
import Popup from '../Popup'
import styles from './index.module.less'

interface MenuBlockProps {}

const MenuBlock: FC<any> = (props: any) => {
  const { data } = props
  const [obj, setObj] = useState({ loading: false, imageUrl: '' })
  const [showlanmuIcon, setShowlanmuIcon] = useState(false)
  const [disableInput, setDisableInput] = useState(true)

  const [showMoudlePopup, setshowMoudlePopup] = useState(false)
  const [inputContent, setInputContent] = useState(data)

  // const [showComponent, setShowComponent] = useState(false)

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const onChange = (checked: any) => {
    console.log(`switch to ${checked}`)
  }
  // 展示弹框
  const showComponent = () => {
    setshowMoudlePopup(false)
  }
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    getBase64(file, imageUrl =>
      setObj({
        imageUrl,
        loading: false
      })
    )
    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <div>
      {obj.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2637867_agmgnj8yyje.js' // 在 iconfont.cn 上生成
  })
  return (
    <div
      className={`flex flex-col h-auto py-2 justify-center hover:bg-[rgba(216,216,216,0.5)] ${styles.menublock}`}
      onMouseEnter={() => {
        setShowlanmuIcon(true)
      }}
      onMouseLeave={() => {
        setShowlanmuIcon(false)
        setDisableInput(true)
      }}
    >
      <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center">
          <HolderOutlined />
          <div>
            <Input
              value={inputContent}
              className="px-2"
              style={{ outline: 'none' }}
              disabled={disableInput}
              onChange={({ target }) => {
                setInputContent(target.value)
              }}
            />
          </div>

          {showlanmuIcon ? (
            <EditOutlined
              onClick={() => {
                setDisableInput(false)
              }}
            />
          ) : null}
        </div>
        {showlanmuIcon ? <DeleteOutlined /> : null}
      </div>
      <div className="flex mb-4 items-center justify-between">
        <div className="flex items-center ">
          <div className="mr-6">是否链接</div>
          <Switch defaultChecked onChange={onChange} />
          <label style={{ paddingLeft: '5px' }}>启用</label>
        </div>
        <div className="rounded-xl flex bg-gray-300 h-6 w-6 items-center justify-center">
          <MyIcon
            type="icon-relevance"
            style={{ fontSize: '20px' }}
            onClick={() => {
              setshowMoudlePopup(true)
            }}
          />
          {showMoudlePopup ? (
            <Popup showComponent={showComponent} data={showMoudlePopup} />
          ) : null}
        </div>
      </div>
      <div>
        <div>icons:</div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          {obj.imageUrl ? (
            <img
              src={obj.imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    </div>
  )
}

export default MenuBlock
