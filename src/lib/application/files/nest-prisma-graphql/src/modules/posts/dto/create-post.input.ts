import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  content: string

  @Field()
  @IsNotEmpty()
  title: string
}
