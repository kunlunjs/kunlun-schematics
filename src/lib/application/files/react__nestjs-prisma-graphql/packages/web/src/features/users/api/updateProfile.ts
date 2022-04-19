import { useMutation } from 'react-query'
import { useAuth } from 'src/lib/auth'
import { axios } from 'src/lib/axios'
import type { MutationConfig } from 'src/lib/react-query'
import { useNotificationStore } from 'src/stores/notifications'

export type UpdateProfileDTO = {
  data: {
    email: string
    firstName: string
    lastName: string
    bio: string
  }
}

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data)
}

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>
}

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { addNotification } = useNotificationStore()
  const { refetchUser } = useAuth()
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Updated'
      })
      refetchUser()
    },
    ...config,
    mutationFn: updateProfile
  })
}
