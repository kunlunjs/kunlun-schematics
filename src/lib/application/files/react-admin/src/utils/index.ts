import dayjs from 'dayjs'

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDateTime = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
}

export const isChinese = (str: any) => {
  return typeof str === 'string' && /[\u4e00-\u9fa5]/.test(str)
}

export const isServiceName = (str: string) => {
  return isChinese(str) && /@/.test(str)
}

export const isDateTime = (str: string) => {
  return /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}[.\d{3}Z]?/.test(str)
}

export const isColor = (str: any) => {
  return (
    typeof str === 'string' &&
    (/#[a-zA-Z\d]{6}$/.test(str.trim()) ||
      /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*[,\d.]*\)$/.test(str.trim()))
  )
}

export const isRichText = (value: any) => {
  return (
    typeof value === 'string' &&
    /^<[a-zA-Z]+\d?/.test(value.trim()) &&
    /<\/[a-zA-Z]+\d?>$/.test(value.trim())
  )
}

export const calcTableColWidth = (title: string) => {
  return title.split('').reduce((acc, cur) => {
    acc = acc + (isChinese(cur) ? 30 : 15)
    return acc
  }, 0)
}

export const JSONParse = (str: any) => {
  try {
    const obj = JSON.parse(str)
    return obj
  } catch {
    return false
  }
}

export const JSONStringify = (obj: any) => {
  try {
    const str = JSON.stringify(obj, null, 2)
    return str
  } catch {
    return false
  }
}

export const noop = () => {}

export * from './component'
export * from './endpoints'
export * from './json-parser'
export * from './icondata'
export * from './preview'
export * from './size'
export * from './type'
