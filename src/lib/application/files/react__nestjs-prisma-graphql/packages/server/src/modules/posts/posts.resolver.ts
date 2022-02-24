import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import type { User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PaginationArgs } from 'src/common/pagination/pagination.args'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'src/common/prisma/prisma.service'
import { UserDecorator } from 'src/decorators'
import { GqlAuthGuard } from 'src/guards'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PostIdArgs } from './args/post-id.args'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserIdArgs } from './args/user-id.args'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreatePostInput } from './dto/create-post.input'
import { PostOrder } from './dto/post-order.input'
// import { PostConnection } from './models/post-connection.model'
import { PostModel } from './models/post.model'

const pubSub = new PubSub()

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => PostModel)
  created() {
    return pubSub.asyncIterator('postCreated')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostModel)
  async create(
    @UserDecorator() user: User,
    @Args('data') data: CreatePostInput
  ) {
    const newPost = this.prisma.post.create({
      data: {
        published: true,
        title: data.title,
        authorId: user.id,
        content: data.content
      }
    })
    pubSub.publish('postCreated', {
      postCreated: newPost
    })
    return newPost
  }

  // @Query(() => PostConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true }) query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true
    })
    orderBy: PostOrder
  ) {
    const result = await findManyCursorConnection(
      args =>
        this.prisma.post.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' }
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args
        }),
      () =>
        this.prisma.post.count({
          where: {
            published: true,
            title: {
              contains: query || ''
            }
          }
        }),
      {
        first,
        last,
        before,
        after
      }
    )
    return result
  }

  @Query(() => [PostModel])
  userPosts(@Args() arg: UserIdArgs) {
    return this.prisma.user
      .findUnique({
        where: {
          id: arg.userId
        }
      })
      .posts({
        where: {
          published: true
        }
      })
    // or
    // return this.prisma.post.findMany({
    //   where: {
    //     published: true,
    //     author: {
    //       id: arg.userId
    //     }
    //   }
    // })
  }

  @Query(() => PostModel)
  async post(@Args() arg: PostIdArgs) {
    return this.prisma.post.findUnique({
      where: {
        id: arg.postId
      }
    })
  }

  @ResolveField('author')
  async author(@Parent() post: PostModel) {
    return this.prisma.post.findUnique({
      where: {
        id: post.id
      }
    })
  }
}
