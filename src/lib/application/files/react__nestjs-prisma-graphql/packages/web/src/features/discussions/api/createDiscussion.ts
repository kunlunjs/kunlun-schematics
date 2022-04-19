import { useMutation } from 'react-query'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { queryClient } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'
import type { Discussion } from '../types'

export type CreateDiscussionDTO = {
  data: {
    title: string
    body: string
  }
}

export const createDiscussion = ({
  data
}: CreateDiscussionDTO): Promise<Discussion> => {
  return axios.post(`/discussions`, data)
}

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createDiscussion>
}

export const useCreateDiscussion = ({
  config
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()
  return useMutation({
    onMutate: async newDiscussion => {
      await queryClient.cancelQueries('discussions')

      const previousDiscussions =
        queryClient.getQueryData<Discussion[]>('discussions')

      queryClient.setQueryData('discussions', [
        ...(previousDiscussions || []),
        newDiscussion.data
      ])

      return { previousDiscussions }
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData('discussions', context.previousDiscussions)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('discussions')
      addNotification({
        type: 'success',
        title: 'Discussion Created'
      })
    },
    ...config,
    mutationFn: createDiscussion
  })
}
