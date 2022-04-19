import { useQuery } from 'react-query'
import { axios } from 'src/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import type { Team } from '../types'

export const getTeams = (): Promise<Team[]> => {
  return axios.get('/teams')
}

type QueryFnType = typeof getTeams

type UseTeamsOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useTeams = ({ config = {} }: UseTeamsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams()
  })
}
