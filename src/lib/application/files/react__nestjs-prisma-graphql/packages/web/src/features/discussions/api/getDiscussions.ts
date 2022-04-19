import { useQuery } from 'react-query'
import { axios } from 'src/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import type { Discussion } from '../types'

export const getDiscussions = (): Promise<Discussion[]> => {
  return axios.get('/discussions')
}

type QueryFnType = typeof getDiscussions

type UseDiscussionsOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useDiscussions = ({ config }: UseDiscussionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['discussions'],
    queryFn: () => getDiscussions()
  })
}
