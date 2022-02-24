import { ObjectType } from '@nestjs/graphql'
import { BaseModel } from 'src/common/models'
import type { UserModel } from 'src/modules/users/models'

@ObjectType()
export class PostModel extends BaseModel {
  title: string

  content: string

  author: UserModel

  published: boolean
}
