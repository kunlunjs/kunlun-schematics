import { useMutation } from 'react-query'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { queryClient } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'
import type { Discussion } from '../types'

export const deleteDiscussion = ({
  discussionId
}: {
  discussionId: string
}) => {
  return axios.delete(`/discussions/${discussionId}`)
}

type UseDeleteDiscussionOptions = {
  config?: MutationConfig<typeof deleteDiscussion>
}

export const useDeleteDiscussion = ({
  config
}: UseDeleteDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: async deletedDiscussion => {
      await queryClient.cancelQueries('discussions')

      const previousDiscussions =
        queryClient.getQueryData<Discussion[]>('discussions')

      queryClient.setQueryData(
        'discussions',
        previousDiscussions?.filter(
          discussion => discussion.id !== deletedDiscussion.discussionId
        )
      )

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
        title: 'Discussion Deleted'
      })
    },
    ...config,
    mutationFn: deleteDiscussion
  })
}
