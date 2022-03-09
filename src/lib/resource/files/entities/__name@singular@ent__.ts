<% if (type === 'graphql-code-first') { %>import { ObjectType, Field<%= importTypes %> } from '@nestjs/graphql'

@ObjectType()
export class <%= singular(classify(name)) %> {
  <% fields.forEach(col => { %>
  @Field(() => <%= col.type %>, { description: '<%= col.title %>' })
  <%= col.name %>: <%= col.tsType %>
  <% }); %>
}<% } else { %>export class <%= singular(classify(name)) %> {}<% } %>
