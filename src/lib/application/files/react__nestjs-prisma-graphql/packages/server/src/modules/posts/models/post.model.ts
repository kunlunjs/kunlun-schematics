import { ObjectType } from '@nestjs/graphql'
import { BaseModel } from 'src/common/models/base.model'
import type { UserModel } from 'src/modules/users/models/user.model'

@ObjectType()
export class PostModel extends BaseModel {
  title: string

  content: string

  author: UserModel

  published: boolean
}
