import { useRequest } from 'ahooks'
import { services } from '@/services'

let imagesList: any
const useGlobalData = () => {
  const res = useRequest(async () => {
    if (!imagesList) {
      const res = await services['全局接口@获取所有接口']()
      const data = res?.data?.data
      if (data?.modelsByName) {
        imagesList = data.modelsByName
      }
    }
    return imagesList
  })
  return res
}
export default useGlobalData
