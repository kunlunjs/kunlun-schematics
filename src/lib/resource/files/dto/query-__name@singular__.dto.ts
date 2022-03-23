import { ApiPropertyOptional } from '@nestjs/swagger'
import { EArticleType, EApprovalStatus } from '@prisma/client'
import { IsOptional, Validate } from 'class-validator'
import { QueryOptionsDto } from '@/common'
import { IsUrlArray, IsValidEnumArray } from '@/validators'

export class QueryArticleDto extends QueryOptionsDto {
  <% fields.forEach(col => { %>
    @ApiPropertyOptional({ description: '<% col.name %>' })
    <% if (col.nullable) { %>@IsNotEmpty()<% } else { %>@IsOptional()<% } %>
    <%= col.name %>: <%= col.tsType %>
  <% }); %>
}
