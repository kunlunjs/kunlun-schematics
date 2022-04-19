import { Table, Spinner } from 'src/components/Elements'
import { formatDate } from 'src/utils/format'
import { useUsers } from '../api/getUsers'
import type { User } from '../types'

import { DeleteUser } from './DeleteUser'

export const UsersList = () => {
  const usersQuery = useUsers()

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!usersQuery.data) return null

  return (
    <Table<User>
      data={usersQuery.data}
      columns={[
        {
          title: 'First Name',
          field: 'firstName'
        },
        {
          title: 'Last Name',
          field: 'lastName'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Role',
          field: 'role'
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>
          }
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />
          }
        }
      ]}
    />
  )
}
