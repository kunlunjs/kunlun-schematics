import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
  // @Field(type => String, { nullable: true })
  endCursor?: string

  // @Field(() => Boolean)
  hasNextPage: boolean

  // @Field(() => Boolean)
  hasPreviousPage: boolean

  // @Field(() => String, { nullable: true })
  startCursor?: string
}
