import type { BaseEntity } from 'src/types'

export type Discussion = {
  title: string
  body: string
  teamId: string
} & BaseEntity
