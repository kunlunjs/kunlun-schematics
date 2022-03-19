import { Modal, Form } from 'antd'
import type { ForwardRefRenderFunction } from 'react'
import { useRef } from 'react'
import { useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import Draggleable from 'react-draggable'
import type { FormRef } from '@/types'
import { KLForm } from '../KLComponents'
import type { KLFormItemProps } from '../KLComponents/helpers'

interface KLTableSettingProps {
  visible: boolean
  title?: string
  items: KLFormItemProps[]
  onCancel: () => void
  onOk: (arg?: any) => void
}

const KLTableSettingWithRef: ForwardRefRenderFunction<
  FormRef,
  KLTableSettingProps
> = ({ visible, items, onOk, onCancel }, ref) => {
  const [form] = Form.useForm()
  const formRef = useRef<FormRef>(null)
  const [draggleDisabled, setDraggleDisabled] = useState(true)

  useImperativeHandle(ref, () => ({
    getValues() {
      return form.getFieldsValue()
    },
    getFormInstance() {
      return form
    },
    clearFormValues() {
      form.setFieldsValue({})
    }
  }))

  // const handleValuesChange: FormProps['onValuesChange'] = (
  //   changeValues,
  //   values
  // ) => {
  //   console.log(changeValues, values)
  // }

  const handleMouseMove = useCallback(() => {
    if (draggleDisabled) {
      setDraggleDisabled(false)
    }
  }, [draggleDisabled])

  const handleMouseOut = useCallback(() => {
    setDraggleDisabled(true)
  }, [])

  const handleOk = () => {
    const form = formRef.current?.getFormInstance()
    form?.validateFields().then(values => {
      onOk(values)
    })
  }

  const handleCancel = () => {
    onCancel()
  }

  if (!visible) {
    return null
  }

  return (
    <Modal
      title={
        <div
          className="cursor-move w-full"
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {}}
          onBlur={() => {}}
        >
          表格页显示设置
        </div>
      }
      visible={visible}
      width={700}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-form-small"
      modalRender={modal => {
        return <Draggleable disabled={draggleDisabled}>{modal}</Draggleable>
      }}
    >
      <KLForm
        ref={formRef}
        itemValues={items}
        // onValuesChange={handleValuesChange}
      />
    </Modal>
  )
}

export const KLTableSetting = forwardRef(KLTableSettingWithRef)

KLTableSetting.displayName = 'KLTableSetting'
