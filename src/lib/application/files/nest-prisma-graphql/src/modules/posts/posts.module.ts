import { Module } from '@nestjs/common'
import { PostsResolver } from './posts.resolver'

@Module({
  providers: [PostsResolver]
})
export class PostsModule {}
