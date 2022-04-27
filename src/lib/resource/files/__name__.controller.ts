<% if (crud && type === 'rest') { %>import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } %>
import {
  KLController,
  KLParam,
  KLQuery,
  KLSuperMethod,
  KLUser
} from '@/decorators'

<% if (type === 'rest') { %>@KLController('<%= dasherize(name) %>')<% } else { %>@Controller()<% } %>
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

  @KLSuperMethod('Get all')
  async findMany(@KLQuery() query: Query<%= classify(name) %>Dto) {
    return await this.<%= lowercased(name) %>Service.findMany(query)
  }

  @KLSuperMethod('Get detail')
  async findOne(@KLParam() params: Connect<%= classify(name) %>Dto) {
    return await this.<%= lowercased(name) %>Service.findById(params)
  }

  @KLSuperMethod('Create item')
  async create(
    @KLUser('id') uid: string | number,
    @Body() body: Create<%= classify(name) %>Dto
  ) {
    return await this.<%= lowercased(name) %>Service.create(body)
  }

  @KLSuperMethod('Update item')
  async update(
    @KLParam() params: Connect<%= classify(name) %>Dto,
    @Body() body: Update<%= classify(name) %>Dto
  ) {
    return await this.<%= lowercased(name) %>Service.updateById(params.id, body)
  }

  @KLSuperMethod('Delete item')
  async deleteById(@KLParam() params: Connect<%= classify(name) %>Dto) {
    return await this.<%= lowercased(name) %>Service.deleteById(params.id)
  }<% } %>
}
