import { HideField, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseModel } from 'src/common/models'

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
  name?: string

  email: string

  mobile?: string

  firstname?: string

  lastname?: string

  role: Role

  @HideField()
  password: string
}
