import type { BaseEntity } from 'src/types'

export type Comment = {
  body: string
  authorId: string
  discussionId: string
} & BaseEntity
