import { ContentLayout } from 'src/components/Layout'
import { Authorization, ROLES } from 'src/lib/authorization'
import { UsersList } from '../components/UsersList'

export const Users = () => {
  return (
    <ContentLayout title="Users">
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <UsersList />
        </Authorization>
      </div>
    </ContentLayout>
  )
}
