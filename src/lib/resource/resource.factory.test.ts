import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing'
import * as path from 'path'
import { ResourceOptions } from './resource.schema'

describe('Resource Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json')
  )

  describe('[REST API]', () => {
    it('should generate appropriate files ', async () => {
      const options: ResourceOptions = {
        name: 'posts'
      }
      const tree = await runner
        .runSchematicAsync('resource', options)
        .toPromise()
      const files = tree.files
      expect(files).toEqual([
        '/modules/posts/posts.controller.spec.ts',
        '/modules/posts/posts.controller.ts',
        '/modules/posts/posts.module.ts',
        '/modules/posts/posts.service.spec.ts',
        '/modules/posts/posts.service.ts',
        '/modules/posts/dto/create-post.dto.ts',
        '/modules/posts/dto/update-post.dto.ts',
        '/modules/posts/entities/post.entity.ts'
      ])
    })
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: ResourceOptions = {
          name: 'posts',
          crud: false
        }
        const tree = await runner
          .runSchematicAsync('resource', options)
          .toPromise()
        const files = tree.files
        expect(files).toEqual([
          '/modules/posts/posts.controller.spec.ts',
          '/modules/posts/posts.controller.ts',
          '/modules/posts/posts.module.ts',
          '/modules/posts/posts.service.spec.ts',
          '/modules/posts/posts.service.ts'
        ])
      })
    })
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: ResourceOptions = {
          name: 'posts',
          spec: false,
          crud: false
        }
        const tree = await runner
          .runSchematicAsync('resource', options)
          .toPromise()
        const files = tree.files
        expect(files).toEqual([
          '/modules/posts/posts.controller.ts',
          '/modules/posts/posts.module.ts',
          '/modules/posts/posts.service.ts'
        ])
      })
    })
  })

  describe('[REST API]', () => {
    const options: ResourceOptions = {
      name: 'posts',
      isSwaggerInstalled: true
    }

    let tree: UnitTestTree

    beforeAll(async () => {
      tree = await runner.runSchematicAsync('resource', options).toPromise()
    })

    it('should generate "PostsController" class', () => {
      expect(tree.readContent('/modules/posts/posts.controller.ts'))
        .toEqual(`import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
`)
    })

    it('should generate "PostsService" class', () => {
      expect(tree.readContent('/modules/posts/posts.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return \`This action returns all posts\`;
  }

  findOne(id: number) {
    return \`This action returns a #\${id} post\`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return \`This action updates a #\${id} post\`;
  }

  remove(id: number) {
    return \`This action removes a #\${id} post\`;
  }
}
`)
    })

    it('should generate "PostsModule" class', () => {
      expect(tree.readContent('/modules/posts/posts.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
`)
    })

    it('should generate "Post" class', () => {
      expect(tree.readContent('/modules/posts/entities/post.entity.ts'))
        .toEqual(`export class Post {}
`)
    })

    it('should generate "CreatePostDto" class', () => {
      expect(tree.readContent('/modules/posts/dto/create-post.dto.ts')).toEqual(
        `export class CreatePostDto {}
`
      )
    })

    it('should generate "UpdatePostDto" class', () => {
      expect(tree.readContent('/modules/posts/dto/update-post.dto.ts'))
        .toEqual(`import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
`)
    })

    it('should generate "PostsController" spec file', () => {
      expect(tree.readContent('/modules/posts/posts.controller.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`)
    })

    it('should generate "PostsService" spec file', () => {
      expect(tree.readContent('/modules/posts/posts.service.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
`)
    })
  })

  describe('[REST API - with "crud" disabled]', () => {
    const options: ResourceOptions = {
      name: 'posts',
      crud: false,
      spec: false
    }

    let tree: UnitTestTree

    beforeAll(async () => {
      tree = await runner.runSchematicAsync('resource', options).toPromise()
    })

    it('should generate "PostsController" class', () => {
      expect(tree.readContent('/modules/posts/posts.controller.ts'))
        .toEqual(`import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
`)
    })

    it('should generate "PostsService" class', () => {
      expect(tree.readContent('/modules/posts/posts.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {}
`)
    })

    it('should generate "PostsModule" class', () => {
      expect(tree.readContent('/modules/posts/posts.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
`)
    })

    it('should not generate "Post" class', () => {
      expect(tree.readContent('/modules/posts/entities/post.entity.ts')).toEqual('')
    })

    it('should not generate "CreatePostDto" class', () => {
      expect(tree.readContent('/modules/posts/dto/create-post.dto.ts')).toEqual('')
    })

    it('should not generate "UpdatePostDto" class', () => {
      expect(tree.readContent('/modules/posts/dto/update-post.dto.ts')).toEqual('')
    })
  })

  describe('[GraphQL - Code first]', () => {
    it('should generate appropriate files ', async () => {
      const options: ResourceOptions = {
        name: 'posts',
        crud: true,
        type: 'graphql-code-first'
      }
      const tree = await runner
        .runSchematicAsync('resource', options)
        .toPromise()
      const files = tree.files
      expect(files).toEqual([
        '/modules/posts/posts.module.ts',
        '/modules/posts/posts.resolver.spec.ts',
        '/modules/posts/posts.resolver.ts',
        '/modules/posts/posts.service.spec.ts',
        '/modules/posts/posts.service.ts',
        '/modules/posts/dto/create-post.input.ts',
        '/modules/posts/dto/update-post.input.ts',
        '/modules/posts/entities/post.entity.ts'
      ])
    })
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: ResourceOptions = {
          name: 'posts',
          crud: false,
          type: 'graphql-code-first'
        }
        const tree = await runner
          .runSchematicAsync('resource', options)
          .toPromise()
        const files = tree.files
        expect(files).toEqual([
          '/modules/posts/posts.module.ts',
          '/modules/posts/posts.resolver.spec.ts',
          '/modules/posts/posts.resolver.ts',
          '/modules/posts/posts.service.spec.ts',
          '/modules/posts/posts.service.ts'
        ])
      })
    })
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: ResourceOptions = {
          name: 'posts',
          spec: false,
          crud: false,
          type: 'graphql-code-first'
        }
        const tree = await runner
          .runSchematicAsync('resource', options)
          .toPromise()
        const files = tree.files
        expect(files).toEqual([
          '/modules/posts/posts.module.ts',
          '/modules/posts/posts.resolver.ts',
          '/modules/posts/posts.service.ts'
        ])
      })
    })
  })
  describe('[GraphQL - Code first]', () => {
    const options: ResourceOptions = {
      name: 'posts',
      crud: true,
      type: 'graphql-code-first'
    }

    let tree: UnitTestTree

    beforeAll(async () => {
      tree = await runner.runSchematicAsync('resource', options).toPromise()
    })

    it('should generate "PostsResolver" class', () => {
      expect(tree.readContent('/modules/posts/posts.resolver.ts'))
        .toEqual(`import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
`)
    })
    it('should generate "PostsService" class', () => {
      expect(tree.readContent('/modules/posts/posts.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll() {
    return \`This action returns all posts\`;
  }

  findOne(id: number) {
    return \`This action returns a #\${id} post\`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return \`This action updates a #\${id} post\`;
  }

  remove(id: number) {
    return \`This action removes a #\${id} post\`;
  }
}
`)
    })

    it('should generate "PostsModule" class', () => {
      expect(tree.readContent('/modules/posts/posts.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PostsResolver, PostsService]
})
export class PostsModule {}
`)
    })

    it('should generate "Post" class', () => {
      expect(tree.readContent('/modules/posts/entities/post.entity.ts'))
        .toEqual(`import { ObjectType, Field, Int, Float } from '@nestjs/graphql'

@ObjectType()
export class Post {

}
`)
    })

    it('should generate "CreatePostInput" class', () => {
      expect(tree.readContent('/modules/posts/dto/create-post.input.ts')).toEqual(
        `import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreatePostInput {

}
`
      )
    })

    it('should generate "UpdatePostInput" class', () => {
      expect(tree.readContent('/modules/posts/dto/update-post.input.ts'))
        .toEqual(`import { CreatePostInput } from './create-post.input'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number
}
`)
    })

    it('should generate "PostsResolver" spec file', () => {
      expect(tree.readContent('/modules/posts/posts.resolver.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsResolver, PostsService],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
`)
    })

    it('should generate "PostsService" spec file', () => {
      expect(tree.readContent('/modules/posts/posts.service.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
`)
    })
  })

})
