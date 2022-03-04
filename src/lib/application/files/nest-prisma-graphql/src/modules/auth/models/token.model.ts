import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJWT } from 'graphql-scalars'

@ObjectType()
export class TokenModel {
  @Field(() => GraphQLJWT, {
    description: 'JWT access token'
  })
  accessToken: string

  @Field(() => GraphQLJWT, {
    description: 'JWT refresh token'
  })
  refreshToken: string
}
