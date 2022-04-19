import type { AxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { set } from 'lodash'
import { API_URL } from 'src/config'
import { useNotificationStore } from 'src/stores/notifications'
import storage from 'src/utils/storage'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken()
  if (token) {
    set(config, 'headers.authorization', token)
  }
  set(config, 'headers.Accept', 'application/json')
  return config
}

export const axios = Axios.create({
  baseURL: API_URL
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const message = error.response?.data?.message || error.message
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message
    })
    return Promise.reject(error)
  }
)
