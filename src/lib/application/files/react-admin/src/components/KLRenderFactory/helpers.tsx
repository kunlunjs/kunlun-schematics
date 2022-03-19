import dayjs from 'dayjs'
import type { DMMFField, SchemaModelByName } from '@/types'
import { JSONStringify } from '@/utils'
import type { KLFormItemProps } from '../KLComponents/helpers'

export const getForms = (
  fields: DMMFField[],
  isCreateOrUpdate = false,
  extraFields: string[] = []
): KLFormItemProps[] => {
  const forms: KLFormItemProps[] = []
  fields.map(field => {
    const { options, documentation = '' } = field
    const isShowForm = isCreateOrUpdate
      ? !field.isCreateOrUpdateFormHidden
      : !field.isQueryFormHidden
    const hasSystemPreset =
      (field.isSystemPreset &&
        localStorage.getItem('role.name') === 'approver') ||
      !field.isSystemPreset
    let isValidItem =
      !field.isId &&
      !field.isHidden &&
      !field.isNested &&
      !field.isCreatedAt &&
      !field.isUpdatedAt &&
      !field.isDeletedAt &&
      !field.isGenerated &&
      !field.isRelationField &&
      isShowForm &&
      hasSystemPreset
    if (extraFields.includes(field.name)) {
      isValidItem = true
    }
    if (isValidItem) {
      const item = {
        type: 'Input',
        name: field.name,
        label: field.title,
        required:
          field.isRequired &&
          !field.isReadOnly &&
          !field.hasDefaultValue &&
          !documentation.match(/@default=/),
        props: {
          disabled: field.isReadOnly && !field.serviceName
        }
      } as KLFormItemProps
      if (!isCreateOrUpdate) {
        item.required = false
        item.props.disabled = false
      }
      if (field.isIcon) {
        item.type = 'Select'
      }
      if (field.isList) {
        item.type = 'Checkbox'
      }
      if (field.isDateTime) {
        item.type = 'DatePicker'
      }
      if (field.isJson) {
        item.type = 'JsonEditor'
      }
      if (field.kind === 'enum' || field.isBoolean) {
        item.type = 'Radio'
      }
      if (field.isTextArea) {
        item.type = 'TextArea'
      }
      if (field.isRichText) {
        item.type = 'KingEditor'
      }
      if (field.isPassword) {
        item.type = 'Password'
      }
      const itype = item.type
      if (
        options &&
        (itype === 'AutoComplete' ||
          itype === 'Cascader' ||
          itype === 'Checkbox' ||
          itype === 'Radio' ||
          itype === 'Rate' ||
          itype === 'Select')
      ) {
        item.options = options
      }
      if (field.isList && !options && isCreateOrUpdate) {
        item.type = 'Select'
        item.props = {
          ...item.props,
          // @ts-ignore
          mode: 'tags',
          placeholder: '请输入后回车，支持多值'
        }
      }
      if (!isCreateOrUpdate && field.isList) {
        item.type = 'Input'
        item.props.placeholder = '请输入（不支持模糊搜索）'
      }
      if (field.isImage || field.isAvatar || field.isFile) {
        if (field.isList) {
          item.type = 'KLUpload'
        } else {
          item.type = 'Upload'
        }
        if (field.isFile) {
          item.props = {
            ...item.props,
            listType: 'text'
          }
        }
      }
      if (field.isColor) {
        // @ts-ignore
        item.type = 'ColorPicker'
      }
      if (field.isInteger) {
        item.type = 'InputNumber'
      }
      if (itype === 'Radio' && item.options && item.options?.length > 2) {
        // @ts-ignore
        item.type = 'Select'
      }

      if (field.serviceName) {
        item.type = 'Select'
        // @ts-ignore
        item.options = options || []
      }
      if (item.type === 'Select') {
        item.props = {
          ...item.props,
          allowClear: true
        }
      }
      if (
        !isCreateOrUpdate &&
        item.type !== 'Upload' &&
        item.type !== 'TextArea' &&
        !field.isRichText
      ) {
        // 查询类
        forms.push(item)
      }
      if (isCreateOrUpdate) {
        // 添加或更新类
        forms.push(item)
      }
    }
    if (field.kind === 'object' && field.title && isShowForm) {
      // TODO
      // if (isNested) {
      //   forms.push({
      //     name,
      //     label: field.title,
      //     type: 'Cascader',
      //     options: options || [],
      //     props: {
      //       expandTrigger: 'hover',
      //       fieldNames: labelNames,
      //       showSearch: {
      //         filter(input, path) {
      //           // @ts-ignore
      //           const label: string = labelNames?.label || 'label'
      //           return path.some(
      //             (option: Record<string, any>) =>
      //               ((option[label] as string) || '')
      //                 .toLowerCase()
      //                 .indexOf(input.toLowerCase()) > -1
      //           )
      //         }
      //       }
      //     }
      //   })
      // } else {
      forms.push({
        name: field.name,
        label: field.title,
        type: 'Select',
        props: {
          mode: field.isList ? 'multiple' : undefined,
          showSearch: true,
          allowClear: true,
          optionFilterProp: 'children'
          // filterOption: (input, option) => {
          //   console.log(input, option)
          //   return true
          // }
        },
        options: options || []
      })
      // }
    }
  })
  return forms
}

export const formatInitialValue = (
  data: any,
  value: any,
  cModel: SchemaModelByName
) => {
  const cfield = cModel?.fieldsByName[value.name]
  if (Array.isArray(data[value.name])) {
    return data[value.name].map((val: any) => {
      return val.id || val
    })
  } else if (typeof value === 'object' && cfield?.isBoolean) {
    return data[value.name] ? 'true' : 'false'
  } else if (value.type === 'DatePicker' && data[value.name]) {
    return dayjs(data[value.name])
  } else if (cfield?.isNested) {
    return cfield.isList
      ? Array.isArray(data)
        ? data.map(i => i[value.name]?.id)
        : [data[value.name]?.id]
      : data[value.name]?.id
  } else if (cfield?.isRelationField) {
    return cfield.isList
      ? Array.isArray(data)
        ? data.map(i => i[value.name]?.id)
        : [data[value.name]?.id]
      : data[value.name]?.id
  } else if (cfield?.isJson) {
    return data[value.name] && JSONStringify(data[value.name])
  } else {
    return data[value.name]
  }
}
