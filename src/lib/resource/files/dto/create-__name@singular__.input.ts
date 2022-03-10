<% if (type === 'graphql-code-first') { %>import { InputType, Field<%= importTypes %> } from '@nestjs/graphql'

@InputType()
export class Create<%= singular(classify(name)) %>Input {
<% fields.forEach(col => { if (col.name !== 'id') { %>
  @Field(() => <%= col.gqlType %>, { description: '<%= col.title %>' })
  <%= col.name %>: <%= col.tsType %>
<% }}); %>
}<% } else { %>export class Create<%= singular(classify(name)) %>Input {}<% } %>
