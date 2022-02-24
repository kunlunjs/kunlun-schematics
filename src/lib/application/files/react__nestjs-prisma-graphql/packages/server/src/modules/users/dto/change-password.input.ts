import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string

  @Field()
  @IsNotEmpty()
  @MinLength(9)
  newPassword: string
}
