import { useQuery } from 'react-query'
import { axios } from 'src/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import type { Team } from '../types'

export const getMyTeam = (): Promise<Team> => {
  return axios.get('/team')
}

type QueryFnType = typeof getMyTeam

type UseMyTeamOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useMyTeam = ({ config }: UseMyTeamOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['my-teams'],
    queryFn: () => getMyTeam()
  })
}
