import type { FormInstance } from 'antd'
import { Button, Col, Form, Row, Space } from 'antd'
import dayjs from 'dayjs'
import { isUndefined } from 'lodash'
import type { ForwardRefRenderFunction } from 'react'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback
} from 'react'
import { useEndPoints } from '@/hooks/useEndpoints'
import type { FormProps, FormRef, SchemaModels } from '@/types'
import Icon from '../Icon'
import { KLForm } from './KLForm'
import type { KLFormItemProps } from './helpers'
// import './KLTableSearch.less'

interface KLTableSearchProps {
  model: SchemaModels
  items: KLFormItemProps[]
  okText?: string
  cancelText?: string
  onReset: () => void
  onSearch: (values: Record<string, any>) => void
  formLayout?: Pick<FormProps, 'labelCol' | 'wrapperCol'>
}

const defaultFormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const KLTableSearchWithRef: ForwardRefRenderFunction<
  FormRef,
  KLTableSearchProps
> = (
  {
    model,
    items = [],
    onReset,
    onSearch,
    okText = '查询',
    cancelText = '重置',
    formLayout = defaultFormLayout
  },
  ref
) => {
  const [form] = Form.useForm()
  const { modelsByName } = useEndPoints()
  const searchFormRef = useRef<FormRef>(null)
  const [expand, setExpand] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      getValues() {
        return getValues()
      },
      getFormInstance() {
        return searchFormRef.current?.getFormInstance() as FormInstance
      },
      clearFormValues() {}
    }),
    [form]
  )

  const getForm = () => {
    const form = searchFormRef.current?.getFormInstance()
    return form
  }

  const getValues = () => {
    const values = getForm()?.getFieldsValue()
    const vals = Object.entries(values).reduce((result, [k, v]) => {
      const field = modelsByName[model]?.fieldsByName[k]
      if (
        Array.isArray(v) &&
        v.length &&
        (field?.isNested || field?.isRelationField)
      ) {
        result[k] = `id=${v.join(',')}`
      } else if (Array.isArray(v) && v.length) {
        result[k] = v.join(',')
      } else if (dayjs.isDayjs(v)) {
        result[k] = v.format('YYYY-MM-DD')
      } else if (!Array.isArray(v) && v !== '' && !isUndefined(v)) {
        result[k] = v
      }
      return result
    }, {} as any)
    return vals
  }

  const handleExpand = useCallback(() => {
    setExpand(!expand)
  }, [expand])

  const handleSearch = () => {
    const vals = getValues()
    onSearch(vals)
  }

  const handleReset = () => {
    searchFormRef.current?.clearFormValues()
    if (onReset) {
      onReset()
    }
  }

  const handlePressEnter = () => {
    handleSearch()
  }

  return (
    <div
      className="bg-white mb-8 py-4 px-4 kl-tablesearch"
      onKeyPress={handlePressEnter}
    >
      <KLForm
        cols={3}
        ref={searchFormRef}
        layout="horizontal"
        itemValues={expand ? items : items.slice(0, 3)}
      />
      <Form form={form} {...formLayout} onFinish={handleSearch}>
        <Row>
          <Col span={24} className="pr-8 justify-end !flex">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<Icon name="SearchOutlined" />}
              >
                {okText}
              </Button>
              <Button icon={<Icon name="RedoOutlined" />} onClick={handleReset}>
                {cancelText}
              </Button>
              {items.length > 3 && (
                <a className="text-sm" onClick={handleExpand}>
                  <Icon name={expand ? 'UpOutlined' : 'DownOutlined'} />{' '}
                  高级搜索
                </a>
              )}
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export const KLTableSearch = forwardRef(KLTableSearchWithRef)

KLTableSearch.displayName = 'KLTableSearch'
