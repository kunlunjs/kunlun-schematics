import { Modal, Space } from 'antd'
import type { CSSProperties, ForwardRefRenderFunction, MouseEvent } from 'react'
import { useMemo } from 'react'
import { forwardRef } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import type { FormRef, SchemaModelByName } from '@/types'
import { JSONParse } from '@/utils'
import Icon from '../Icon'
import { KLForm } from './KLForm'
import type { KLFormItemProps } from './helpers'
import './KLModal.less'

interface KLModalProps {
  cModel?: SchemaModelByName
  items: KLFormItemProps[]
  visible: boolean
  title?: string
  confirmLoading: boolean
  onCancel: () => void
  onOk: (arg: Record<string, any>) => void
  style?: CSSProperties
  bodyStyle?: CSSProperties
}

const defaultBodyStyle: CSSProperties = {
  minHeight: 500,
  maxHeight: 500,
  overflow: 'auto'
}

const KLModalWithRef: ForwardRefRenderFunction<FormRef, KLModalProps> = (
  {
    cModel,
    visible,
    title,
    confirmLoading,
    items,
    onOk,
    onCancel,
    style,
    children,
    bodyStyle = defaultBodyStyle
  },
  ref
) => {
  const formRef = useRef<FormRef>(null)
  const [isFullScreen, setFullScreen] = useState(false)

  const defaultGetPopupContainerFunc = (trigger: any) => trigger.parentNode

  const fixedItems = useMemo(() => {
    const fixedItems = items.map(item => {
      if (item.type === 'Select') {
        return {
          ...item,
          props: {
            ...(item.props ?? {}),
            getPopupContainer:
              item.props?.getPopupContainer ?? defaultGetPopupContainerFunc
          }
        }
      }
      return item
    })
    return fixedItems
  }, [items])

  // const handle = useFullScreenHandle()

  // useImperativeHandle(ref, () => {
  //   return {
  //     getValues() {
  //       const values = formRef.current?.getValues()
  //       return values || {}
  //     },
  //     getFormInstance() {
  //       return formRef.current!.getFormInstance()
  //     },
  //     clearFormValues() {
  //       return formRef.current!.clearFormValues()
  //     }
  //   }
  // })

  const handleOk = async () => {
    const form = formRef.current?.getFormInstance()
    if (form) {
      const values = form?.getFieldsValue()
      let errors = false
      const formatValues = { ...values }
      for (const i of items) {
        const v = values[i.name as string] as string
        if (
          !Array.isArray(v) &&
          cModel?.fieldsByName[i.name as string].isJson &&
          cModel?.fieldsByName[i.name as string].isRequired &&
          !JSONParse(v)
        ) {
          errors = true
          form?.setFields([
            {
              name: i!.name as string,
              errors: ['格式错误，必须是 JSON ']
            }
          ])
          break
        } else {
          formatValues[i.name as string] = Array.isArray(v) ? v : JSONParse(v)
        }
      }
      if (!errors) {
        form
          ?.validateFields()
          .then(() => {
            onOk(values)
            setFullScreen(false)
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }

  const handleCancel = useCallback(() => {
    setFullScreen(false)
    onCancel()
  }, [])

  if (!visible) {
    return null
  }

  return (
    <Modal
      title={title}
      visible
      width={isFullScreen ? window.innerWidth : 800}
      style={style}
      okText="提交"
      onOk={handleOk}
      keyboard={false}
      closeIcon={
        <Space>
          <Icon
            className="cursor-pointer"
            onClick={(e: MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation()
              // handle.active ? handle.exit() : handle.enter()
              setFullScreen(!isFullScreen)
              const content = document.getElementsByClassName(
                'ant-modal-content'
              )?.[0] as HTMLElement
              if (content) {
                content.style.height = !isFullScreen
                  ? 'calc(100vh - 48px)'
                  : '608px'
              }
              const body = document.getElementsByClassName(
                'ant-modal-body'
              )?.[0] as HTMLElement
              if (body) {
                body.style.minHeight = !isFullScreen ? '680px' : '500px'
                body.style.maxHeight = !isFullScreen ? '680px' : '500px'
              }
              const modal = document.getElementsByClassName(
                'ant-modal'
              )?.[0] as HTMLElement
              if (modal) {
                modal.style.top = !isFullScreen ? '24px' : '100px'
              }
            }}
            name={
              isFullScreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'
            }
          />
          <Icon name="CloseOutlined" onClick={handleCancel} />
        </Space>
      }
      maskClosable={false}
      bodyStyle={bodyStyle}
      onCancel={handleCancel}
      className="kl-modal"
      confirmLoading={confirmLoading}
      destroyOnClose
    >
      {children || <KLForm ref={formRef} itemValues={fixedItems} />}
    </Modal>
  )
}
export const KLModal = forwardRef(KLModalWithRef)
KLModal.displayName = 'EffectModal'
