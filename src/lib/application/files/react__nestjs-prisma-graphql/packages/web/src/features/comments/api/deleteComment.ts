import { useMutation } from 'react-query'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { queryClient } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'
import type { Comment } from '../types'

export const deleteComment = ({ commentId }: { commentId: string }) => {
  return axios.delete(`/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  discussionId: string
  config?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({
  config,
  discussionId
}: UseDeleteCommentOptions) => {
  const { addNotification } = useNotificationStore()
  return useMutation({
    onMutate: async deletedComment => {
      await queryClient.cancelQueries(['comments', discussionId])

      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        discussionId
      ])

      queryClient.setQueryData(
        ['comments', discussionId],
        previousComments?.filter(
          comment => comment.id !== deletedComment.commentId
        )
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
        title: 'Comment Deleted'
      })
    },
    ...config,
    mutationFn: deleteComment
  })
}
