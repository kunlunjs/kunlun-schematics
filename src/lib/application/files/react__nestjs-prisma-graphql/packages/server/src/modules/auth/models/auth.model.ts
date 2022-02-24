import { ObjectType } from '@nestjs/graphql'
import type { UserModel } from 'src/modules/users/models/user.model'
import { TokenModel } from './token.model'

@ObjectType()
export class AuthModel extends TokenModel {
  user: UserModel
}
