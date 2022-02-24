import { HideField, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseModel } from 'src/common/models/base.model'
import type { PostModel } from 'src/modules/posts/models/post.model'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role'
})

@ObjectType()
export class UserModel extends BaseModel {
  email: string

  firstname?: string

  lastname?: string

  role: Role

  posts: PostModel[]

  @HideField()
  password: string
}
