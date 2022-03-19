import { useRequest } from 'ahooks'
import { message } from 'antd'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import type { ColumnsType } from 'antd/lib/table'
import { forEach, merge, pickBy } from 'lodash'
import type { FC, Key, MouseEvent, ReactElement, SetStateAction } from 'react'
import { useEffect, useRef, useState, useMemo } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useHistory } from 'react-router-dom'
// import { KLTableSetting } from './_KLTableSetting'
import {
  KLModal,
  KLTable,
  KLTableButtons,
  KLTableSearch
} from '@/components/KLComponents'
import type { Services } from '@/hooks/useEndpoints'
import { useEndPoints, useStructure } from '@/hooks/useEndpoints'
import { useTableColumns } from '@/hooks/useTableColumns'
import { services } from '@/services'
import type {
  FormRef,
  IKLTableButtons,
  TableRef,
  TableProps,
  MenuProps,
  ButtonProps,
  SchemaModels,
  SchemaModelByName
} from '@/types'
import { formatQueryObject, formatSearchItems, formatSorter } from '@/utils'
import { KLTableOperationCell } from '../KLComponents/KLTableOperationCell'
import type { KLFormItemProps } from '../KLComponents/helpers'
import { formatInitialValue } from './helpers'
import './KLTableFactory.less'

interface ModalState {
  visible: boolean
  title?: string
  id?: number
  type?: string
}
interface KLTableFactoryProps {
  model: SchemaModels
  rowSelectionType?: 'checkbox' | 'radio'
  footer?: (...props: any[]) => ReactElement | null
  customFieldRender: Record<string, KLFormItemProps>
}

const KLTableFactory: FC<KLTableFactoryProps> = ({
  model,
  footer,
  rowSelectionType,
  customFieldRender
}) => {
  const isApprover = localStorage.getItem('role.name') === 'approver'
  const { pathname } = window.location
  const history = useHistory()
  const handle = useFullScreenHandle()
  // const location = useLocation()
  // const query = qs.parse(location.search)
  const isAdmin = false
  const current = useRef<number | null>(null)
  const modalRef = useRef<FormRef>(null)
  // const settingModalRef = useRef<FormRef>(null)
  const searchRef = useRef<FormRef>(null)
  const tableRef = useRef<TableRef>(null)
  const { modelsByName, enumsByName } = useEndPoints()
  const { structure, forceUpdate } = useStructure(model)
  const [showColumns, setShowColumns] = useState<string[]>(
    JSON.parse(localStorage.getItem(`${model}:columns`) || '[]')
  )
  const [size, setSize] = useState<TableProps['size']>('small')
  const [modal, setModal] = useState<
    ModalState & { items?: KLFormItemProps[] }
  >({
    visible: false
  })
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  // const [settingModal, setSettingModal] = useState<ModalState>({
  //   visible: false
  // })
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false)

  const { searchFormItems, effectFormItems, buttons, modalConfig, interfaces } =
    structure

  // 支持item属性覆盖
  if (customFieldRender) {
    Object.keys(customFieldRender).forEach(key => {
      const index = effectFormItems.findIndex(item => item.name === key)
      if (index > -1) {
        effectFormItems[index] = merge(
          effectFormItems[index],
          customFieldRender[key]
        )
      }
    })
  }

  const cModel = modelsByName[model] as SchemaModelByName

  // 加载列表数据
  const { data, loading, run, refresh } = useRequest(
    (name: Services, options: any = {}) => {
      return services[name](options)
    },
    {
      manual: true
    }
  )

  // 添加/更新/删除
  const { run: effectRun, loading: effectLoading } = useRequest(
    async (name: Services, options: any = {}, msg?: string) => {
      const res = await services[name](options)
      const { success, errCode, errMessage } = res
      if (success) {
        message.success(
          msg ? msg : `${(name.match(/@(.{2})/) as string[])[1]}成功`
        )
        current.current = null
        setModalConfirmLoading(false)
        delete modal.items
        setModal({
          ...modal,
          visible: false
        })
        refresh()
        forceUpdate()
      } else {
        setModalConfirmLoading(false)
        message.error(
          res.message || `${(name.match(/@(.{2})/) as string[])[1]}失败`
        )
      }
      return res
    },
    {
      manual: true
    }
  )

  useEffect(() => {
    if (interfaces.list) {
      run(interfaces.list)
    }
  }, [interfaces.list])

  const getSearchValues = () => {
    const form = searchRef.current?.getFormInstance()
    const values = form
      ? pickBy(form.getFieldsValue(), val => {
          return val !== undefined && val !== ''
        })
      : {}
    return values
  }

  const tableState = tableRef.current?.getState()

  const hanleReset = () => {
    if (interfaces.list) {
      run(interfaces.list, {
        _pageNumber: 1,
        _pageSize: tableState?.pagination.pageSize || 10
      })
    }
  }

  const handleSearch = (values: Record<string, any>) => {
    if (interfaces.list) {
      run(interfaces.list, {
        // ...getSearchValues(),
        ...values,
        _pageNumber: 1,
        _pageSize: tableState?.pagination?.pageSize
      })
    }
  }

  const handleAdd: ButtonProps['onClick'] = e => {
    current.current = null
    setModal({
      visible: true,
      title: `添加${structure.tag}`
    })
  }

  const handleView = (e: MouseEvent<HTMLAnchorElement> | string | number) => {
    let id
    if (typeof e === 'number' || typeof e === 'string') {
      id = e
    } else {
      id = e.currentTarget.getAttribute('data-id')
    }
    if (id) {
      history.push(`${pathname}/details?id=${id}&model=${model}`)
    }
  }

  const handleEdit = async (
    e: MouseEvent<HTMLAnchorElement> | string | number
  ) => {
    let id
    if (typeof e === 'number' || typeof e === 'string') {
      id = e
    } else {
      e.preventDefault()
      id = e.currentTarget.getAttribute('data-id')
    }
    if (id) {
      current.current = +id
      if (interfaces?.detail) {
        const res = await services[interfaces?.detail]({ id })
        const { data } = res
        const items = effectFormItems.map(val => {
          return {
            ...val,
            initialValue: formatInitialValue(data, val, cModel)
          }
        })
        setModal({
          items,
          visible: true,
          type: 'update',
          id: current.current,
          title: `更新${structure.tag}`
        })
      }
    }
  }

  const handleAbandoned = (
    e: MouseEvent<HTMLAnchorElement> | string | number
  ) => {
    let id
    if (typeof e === 'number' || typeof e === 'string') {
      id = e
    } else {
      e.preventDefault()
      id = e.currentTarget.getAttribute('data-id')
    }
    if (id && interfaces.update) {
      effectRun(
        interfaces.update,
        {
          id: Number(id),
          approvalStatus: 'Pending'
        },
        '废弃成功，重新进入待发布'
      )
    }
  }

  const handleApprove: MenuProps['onClick'] = args => {
    const [status, id] = args.key.split('@@')
    const res = {
      同意: '审核通过成功',
      拒绝: '已拒绝发布成功'
    }
    if (interfaces.update) {
      effectRun(
        interfaces.update,
        {
          id: Number(id),
          approvalStatus: status
        },
        res[status as keyof typeof res]
      )
    }
  }

  const handleCopy = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  const handleConfirm = async () => {
    const id = current.current
    const name = interfaces?.delete
    if (id && name) {
      effectRun(name as Services, { id })
    }
  }
  const handleDelete = (e: MouseEvent<HTMLAnchorElement> | number | string) => {
    let id
    if (typeof e === 'number' || typeof e === 'string') {
      id = e
    } else {
      e.preventDefault()
      id = e.currentTarget.getAttribute('data-id')
    }
    if (id && interfaces?.delete) {
      current.current = +id
    }
  }

  const handleChangeSize: MenuProps['onClick'] = e => {
    if (typeof e.key === 'string') {
      setSize(e.key as SetStateAction<SizeType>)
    }
  }

  const handleTableChange = (
    paging: Record<string, any>,
    filters: Record<string, any[]>,
    sorter: Record<string, any>[]
  ) => {
    const { pageSize } = paging
    if (interfaces.list) {
      const _sorter = formatSorter(sorter)
      const query: Record<string, any> = {
        ...formatQueryObject(searchRef.current?.getValues(), filters),
        _pageNumber: paging.current,
        _pageSize: pageSize
      }
      if (_sorter) {
        query._sorter = formatSorter(sorter)
      }
      run(interfaces.list, query)
    }
  }

  const handleUpdate = (id: string | number, key: string, value: any) => {
    if (interfaces.update) {
      effectRun(interfaces.update, {
        id,
        [key]: value
      })
    }
  }

  const handleFullScreen = () => {
    if (handle?.active) {
      handle.exit()
    } else {
      handle.enter()
    }
  }

  const _columns = [
    ...useTableColumns({
      model,
      pagination: tableState?.pagination,
      sortedInfo: tableState?.sortedInfo,
      filteredInfo: tableState?.filteredInfo,
      onClick: handleUpdate
    })
  ]

  const handleModalOk = (values: Record<string, any>) => {
    setModalConfirmLoading(true)
    const name = current.current ? interfaces.update : interfaces.add
    const formatValues: Record<string, any> = {}
    forEach(values, (value, key) => {
      const field = structure.fieldsByName[key]
      if (field.isBoolean && value === 'false') {
        formatValues[key] = false
      } else if (field.isBoolean && value === 'true') {
        formatValues[key] = true
      } else if (field.isInteger && !isNaN(Number(value))) {
        formatValues[key] = Number(value)
      } else {
        formatValues[key] = value
      }
    })
    if (isApprover) {
      formatValues.approvalStatus = 'Published'
    }
    if (name) {
      effectRun(
        name,
        current.current
          ? { ...formatValues, id: current.current }
          : formatValues
      )
    }
  }

  const handleModalCancel = () => {
    setModal({
      visible: false
    })
    setModalConfirmLoading(false)
  }

  const columns = useMemo(() => {
    if (interfaces.delete || interfaces.detail || interfaces.update) {
      const width =
        [
          !!interfaces.detail,
          !!interfaces.update,
          !!interfaces.delete,
          isApprover,
          pathname.startsWith('/tables')
        ].filter(Boolean).length * 35
      const cl: ColumnsType<Record<string, any>>[number] = {
        title: '操作',
        key: '_opera',
        align: 'center',
        fixed: 'right',
        width,
        render: (_: any, record: any) => {
          return (
            <KLTableOperationCell
              columns={_columns}
              record={record}
              onView={handleView}
              onUpdate={handleEdit}
              onDelete={handleDelete}
              onConfirm={handleConfirm}
              onApprove={handleApprove}
              onAbandoned={handleAbandoned}
              hasDetailInterface={!!interfaces.detail}
              hasUpdateInterface={!!interfaces.update}
              hasDeleteInterface={!!interfaces.delete}
            />
          )
        }
      }
      _columns.push(cl)
    }
    return _columns
  }, [
    data?.data?.items,
    cModel,
    showColumns,
    effectFormItems,
    structure.interfaces
  ])

  // TODO
  const buttonsEvent = useMemo(() => {
    return buttons.reduce((obj, { name = '' }) => {
      if (/^查看|^浏览/.test(name)) {
        obj[name] = handleView
      } else if (/^添加|^发布/.test(name)) {
        obj[name] = handleAdd
      } else if (/^更新|^编辑/.test(name)) {
        obj[name] = handleEdit
      } else if (/^复制|^拷贝/.test(name)) {
        obj[name] = handleCopy
      } else if (/^删除|^移除|^批量删除/.test(name)) {
        obj[name] = handleDelete
      }
      return obj
    }, {} as any /* (isAdmin ? { 配置: handleConfig } : {}) as IKLTableButtons */) // IKLTableButtons
  }, [buttons])

  const _configs: IKLTableButtons = [
    {
      range: 'common',
      tooltip: '刷新',
      icon: 'ReloadOutlined',
      onClick() {
        refresh()
      }
    },
    {
      range: 'common',
      tooltip:
        '还原过滤和排序项，【默认以“排序/发布时间/创建时间”列（如存在）为先后降序排列】',
      icon: 'ClearOutlined',
      onClick() {
        tableRef.current?.clearFilterAndSorter()
        if (interfaces.list) {
          run(interfaces.list, {
            ...searchRef.current?.getValues(),
            _pageNumber: 1,
            _pageSize: tableState?.pagination.pageSize || 10
          })
        }
      }
    },
    {
      range: 'common',
      tooltip: '尺寸',
      onClick: handleChangeSize,
      icon: 'VerticalAlignMiddleOutlined',
      activeKey: size,
      menus: [
        { label: '小', value: 'small' },
        { label: '中', value: 'middle' },
        { label: '大', value: 'large' }
      ]
    },
    // {
    //   range: 'common',
    //   tooltip: '表格列配置',
    //   icon: 'SettingOutlined',
    //   onClick: handleSetting
    // },
    {
      range: 'common',
      tooltip: '全屏',
      icon: handle.active ? 'FullscreenExitOutlined' : 'FullscreenOutlined',
      onClick: handleFullScreen
    },
    isAdmin && {
      range: 'system',
      name: '配置',
      type: 'dashed',
      icon: 'SettingOutlined'
    }
  ].filter(Boolean) as IKLTableButtons

  const extraButtons = _configs // !isAdmin ? _configs : []

  const handleSelectedRowsChange = (
    selectedKeys: Key[],
    selectedRows: Record<string, any>[]
  ) => {
    setSelectedRows(selectedRows)
  }

  return (
    <div>
      <KLTableSearch
        model={model}
        ref={searchRef}
        onReset={hanleReset}
        onSearch={handleSearch}
        items={formatSearchItems(searchFormItems)}
      />
      <FullScreen handle={handle} className="bg-white p-8">
        <div>
          <div
            className={`flex mb-3 ${
              buttons.length ? 'justify-between' : 'justify-end'
            } items-center`}
          >
            <KLTableButtons
              buttons={buttons.concat(extraButtons).map(i => {
                const { name = '' } = i
                if (buttonsEvent[name]) {
                  i.onClick = buttonsEvent[name]
                }
                return i
              })}
            />
          </div>
          <KLTable
            ref={tableRef}
            model={model}
            size={size}
            columns={columns}
            data={data?.data?.items}
            total={data?.data?.total}
            onChange={handleTableChange}
            loading={loading || effectLoading}
            rowSelection={
              rowSelectionType
                ? {
                    type: rowSelectionType || 'checkbox',
                    onChange: handleSelectedRowsChange
                  }
                : false
            }
          />
        </div>
      </FullScreen>
      {/* 表格行列操作 Modal */}
      {!!modalConfig.length && (
        <KLModal
          cModel={cModel}
          ref={modalRef}
          items={effectFormItems}
          {...modal}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          confirmLoading={modalConfirmLoading}
        />
      )}
      {footer && footer({ className: 'mt-4', selectedRow: selectedRows[0] })}
    </div>
  )
}

export default KLTableFactory
