<% if (type === 'graphql-code-first') { %>import { Injectable } from '@nestjs/common';<% if (crud && type !== 'graphql-code-first' && type !== 'graphql-schema-first') { %>
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } else if (crud) { %>
import { Create<%= singular(classify(name)) %>Input } from './dto/create-<%= singular(name) %>.input';
import { Update<%= singular(classify(name)) %>Input } from './dto/update-<%= singular(name) %>.input';<% } %>

@Injectable()
export class <%= classify(name) %>Service {<% if (crud) { %>
  create(<% if (type !== 'graphql-code-first' && type !== 'graphql-schema-first') { %>create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto<% } else { %>create<%= singular(classify(name)) %>Input: Create<%= singular(classify(name)) %>Input<% } %>) {
    return 'This action adds a new <%= lowercased(singular(classify(name))) %>';
  }

  findAll() {
    return `This action returns all <%= lowercased(classify(name)) %>`;
  }

  findOne(id: number) {
    return `This action returns a #${id} <%= lowercased(singular(classify(name))) %>`;
  }

  update(id: number, <% if (type !== 'graphql-code-first' && type !== 'graphql-schema-first') { %>update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto<% } else { %>update<%= singular(classify(name)) %>Input: Update<%= singular(classify(name)) %>Input<% } %>) {
    return `This action updates a #${id} <%= lowercased(singular(classify(name))) %>`;
  }

  remove(id: number) {
    return `This action removes a #${id} <%= lowercased(singular(classify(name))) %>`;
  }<% } %>
}
<% } else { %>import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { <%= classify(name) %>Model } from '@prisma/client'
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import { Query<%= singular(classify(name)) %>Dto } from './dto/query-<%= singular(name) %>.dto';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '@/shared/prisma.service'
import {
  buildWhere,
  buildDataForCreateOrUpdate,
  getSelectFields,
  builderOrderBy
} from '@/utils'

type ModelInstance<T extends SchemaGeneratedModels> = InstanceType<
  typeof PrismaService
>[T]
type Model<M extends SchemaGeneratedModelMethods> = Parameters<
  ModelInstance<'<%= lowercased(name) %>Model'>[M]
>[0]
type IdType = <%= classify(name) %>Model['id']

@Injectable()
export class <%= classify(name) %>Service implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {}

  async findById(where: Model<'findUnique'>['where']) {
    return this.prisma.<%= lowercased(name) %>Model.findUnique({
      where,
      select: getSelectFields('<%= classify(name) %>Model', true)
    })
  }

  async findMany(query: Query<%= classify(name) %>Dto) {
    const { _skip: skip, _take: take, _like = true, _sorter, ...rest } = query
    const where = buildWhere('<%= classify(name) %>Model', rest, _like)
    const items = await this.prisma.<%= lowercased(name) %>Model.findMany({
      where,
      skip,
      take,
      select: getSelectFields('<%= classify(name) %>Model', rest),
      orderBy: builderOrderBy('<%= classify(name) %>Model', _sorter)
    })
    const total = await this.prisma.<%= lowercased(name) %>Model.count({
      where
    })
    return { total, items }
  }

  async create(payload: Create<%= classify(name) %>Dto) {
    const data = buildDataForCreateOrUpdate(
      '<%= classify(name) %>Model',
      payload
    ) as Model<'create'>['data']
    return this.prisma.<%= lowercased(name) %>Model.create({ data })
  }

  async updateById(id: IdType, payload: Update<%= classify(name) %>Dto) {
    const data = buildDataForCreateOrUpdate(
      '<%= classify(name) %>Model',
      payload,
      false
    ) as Model<'update'>['data']
    return this.prisma.<%= lowercased(name) %>Model.update({
      where: { id },
      data
    })
  }

  async deleteById(id: IdType) {
    return this.prisma.<%= lowercased(name) %>Model.delete({
      where: { id }
    })
  }
}
<% } %>