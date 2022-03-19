import { Form, Modal, Radio } from 'antd'
import { useState } from 'react'
import AntdInput from './components'

const Popup = (props: any) => {
  const { data, showComponent } = props
  const [isModalVisible, setIsModalVisible] = useState(data)
  const [value, setValue] = useState(1)

  const arr = ['网页', '网址', '文件', '电子邮件', '电话']
  const arr0 = ['关于我们']
  const arr1 = ['网页顶端']
  const handleOk = () => {
    setIsModalVisible(false)
    showComponent?.()
  }

  const handleCancel = () => {
    showComponent?.()
    setIsModalVisible(false)
  }
  const onChange = (e: any) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <Form name="popup_controls">
      <Form.Item name="modal">
        <Modal
          title="链接至"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex  .h-40 justify-around ">
            <div>
              <Radio.Group onChange={onChange}>
                {arr.map((item: any, index: any) => {
                  return (
                    <div style={{ paddingBottom: '10px' }} key={index}>
                      <Radio value={index}>{item}</Radio>
                    </div>
                  )
                })}
              </Radio.Group>
            </div>
            <div className=" border-l flex flex-col .h-full border-gray-300 pl-3 justify-around">
              <AntdInput data={'选择页面配置'} arr={arr0} />
              <AntdInput data={'选择页面上的位置'} arr={arr1} />
            </div>
          </div>
        </Modal>
      </Form.Item>
    </Form>
  )
}

export default Popup
