import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'src/common/prisma/prisma.service'
import { UserDecorator } from 'src/decorators'
import { GqlAuthGuard } from 'src/guards'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChangePasswordInput } from './dto/change-password.input'
import { UserModel } from './models/user.model'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UsersService } from './users.service'

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => UserModel)
  async me(@UserDecorator() user: UserModel): Promise<UserModel> {
    return user
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @UserDecorator() user: UserModel,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    )
  }

  @ResolveField('posts')
  posts(@Parent() author: UserModel) {
    return this.prisma.user
      .findUnique({
        where: {
          id: author.id
        }
      })
      .posts()
  }
}
