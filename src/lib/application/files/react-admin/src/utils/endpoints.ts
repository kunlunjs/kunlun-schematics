import { assign } from 'lodash'

export const formatQueryObject = (
  obj1: Record<string, (number | string)[]> = {},
  obj2: Record<string, (number | string)[]>
) => {
  const result: Record<string, any> = {}
  const obj = assign({}, obj1, obj2)
  Object.keys(obj).map(key => {
    if ((Array.isArray(obj[key]) && obj[key].length) || obj[key]) {
      result[key] =
        Array.isArray(obj[key]) && obj[key].length
          ? obj[key].join(',')
          : obj[key]
    }
  })
  return result
}

export const formatSorter = (array: Record<string, any>[]) => {
  const result = array
    .map(i => {
      if (i.columnKey && i.order === 'ascend') {
        return `${i.columnKey}:asc`
      }
      if (i.columnKey && i.order === 'descend') {
        return `${i.columnKey}:desc`
      }
    })
    .join(',')
  return result.endsWith(',') ? result.slice(0, -1) : result
}
