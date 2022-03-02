import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({
  isAbstract: true
})
export abstract class BaseModel {
  @Field(() => ID)
  id: string

  @Field({
    description: '创建时间'
  })
  createdAt: Date

  @Field({
    description: '更新时间'
  })
  updatedAt: Date
}
