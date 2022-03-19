import { useRequest } from 'ahooks'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { services } from '@/services'

interface ParkSelectorProps extends SelectProps<string> {}

const ParkSelector = (props: ParkSelectorProps) => {
  const request = useRequest(async () => {
    const { data, success } = await services['园区管理@获取园区列表']({
      _pageNumber: 1,
      _pageSize: 9999
    })
    return success
      ? data!.items!.map(item => ({ label: item.name, value: item.id }))
      : []
  })
  return <Select {...props} options={request.data} />
}

export default ParkSelector
