import { useMutation } from 'react-query'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { queryClient } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'

import type { Comment } from '../types'

export type CreateCommentDTO = {
  data: {
    body: string
    discussionId: string
  }
}

export const createComment = ({ data }: CreateCommentDTO): Promise<Comment> => {
  return axios.post('/comments', data)
}

type UseCreateCommentOptions = {
  discussionId: string
  config?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({
  config,
  discussionId
}: UseCreateCommentOptions) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: async newComment => {
      await queryClient.cancelQueries(['comments', discussionId])

      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        discussionId
      ])

      queryClient.setQueryData(
        ['comments', discussionId],
        [...(previousComments || []), newComment.data]
      )

      return { previousComments }
    },
    onError: (_, __, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', discussionId],
          context.previousComments
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', discussionId])
      addNotification({
        type: 'success',
        title: 'Comment Created'
      })
    },
    ...config,
    mutationFn: createComment
  })
}
