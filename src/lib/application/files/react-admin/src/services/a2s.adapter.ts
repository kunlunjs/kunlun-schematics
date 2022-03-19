/* eslint-disable */
import { getFingerPrint } from './fingerprint'
import { API_ENDPOINT, REQ_TIMEOUT } from '@/config/constants'
import axios from 'axios'
import { services } from './index'
import { RequestFunctionArgs, ResponseObject } from './a2s.types'

const instance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: REQ_TIMEOUT
  // headers: {}
})

instance.interceptors.request.use(
  async config => {
    config.headers = config.headers || {}
    const fingerPrint = await getFingerPrint()
    config.headers['x-guid'] = fingerPrint
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    if (
      res?.data?.status === 401 &&
      !window.location.pathname.startsWith('/login')
    ) {
      window.location.href = '/login'
    }
    return res
  },
  err => {
    window.location.href = '/login'
    return Promise.reject(err)
  }
)

const fileNameMapping: Record<string, string> = {}

export async function requestAdapter<
  T extends {
    data?: any
  }
>(args: RequestFunctionArgs): Promise<ResponseObject<T>> {
  const { url, method, query, body, done = true } = args
  const token = localStorage.getItem('token')
  const responseType = url.split('?')[0].match(/export/) ? 'blob' : 'json'
  const isFormData = body.file instanceof FormData
  let obj = { ...query }
  Object.keys(obj).map(val => {
    if (obj[val] instanceof Object) {
      obj[val] = JSON.stringify(obj[val])
    }
  })

  const { status, data, headers } = await instance({
    url,
    method,
    params: obj,
    responseType,
    data: isFormData ? body.file : body,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }
  })
  // console.log('response: ', headers, status, data)
  if (responseType === 'blob') {
    const disposition = headers['content-disposition']
    const contentType = headers['content-type']
    const fileName =
      disposition &&
      decodeURI(
        disposition.substring(
          disposition.indexOf('filename=') + 10,
          disposition.length - 1
        )
      )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    const mapName = fileNameMapping[fileName?.substring(0, fileName.length - 5)]
    const cName =
      fileName && fileName.indexOf('xlsx') > -1
        ? mapName
          ? mapName + '.xlsx'
          : fileName
        : ''
    link.download = cName || fileName || '下载'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  if ((status < 300 && status >= 200) || status === 304) {
    return data
  }
  return null as any as T
}

/**
 * 上传
 * @param file 文件
 */
export function upload(file: File) {
  const form = new FormData()
  // form.append('name', file.name?.slice(0, 60))
  form.append('file', file)
  // @ts-ignore
  return services['文件管理@文件上传']({ file: form })
}
