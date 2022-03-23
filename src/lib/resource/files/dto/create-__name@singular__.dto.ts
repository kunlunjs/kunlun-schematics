import { ApiPropertyOptional } from '@nestjs/swagger'
import { E<%= classify(name) %>Type, EApprovalStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsOptional,
  IsNotEmpty,
  IsArray
} from 'class-validator'

export class Create<%= singular(classify(name)) %>Dto {
  <% fields.forEach(col => { %>
    @ApiPropertyOptional({ description: '<% col.name %>' })
    <% if (col.nullable) { %>@IsNotEmpty()<% } else { %>@IsOptional()<% } %>
    <% if (col.isArray) { %>@IsArray()<% } %>
    <%= col.name %>: <%= col.tsType %>
  <% }); %>
  }
