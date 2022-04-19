import { useMutation } from 'react-query'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { queryClient } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'
import type { User } from '../types'

export type DeleteUserDTO = {
  userId: string
}

export const deleteUser = ({ userId }: DeleteUserDTO) => {
  return axios.delete(`/users/${userId}`)
}

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>
}

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onMutate: async deletedUser => {
      await queryClient.cancelQueries('users')

      const previousUsers = queryClient.getQueryData<User[]>('users')

      queryClient.setQueryData(
        'users',
        previousUsers?.filter(
          discussion => discussion.id !== deletedUser.userId
        )
      )

      return { previousUsers }
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      addNotification({
        type: 'success',
        title: 'User Deleted'
      })
    },
    ...config,
    mutationFn: deleteUser
  })
}
