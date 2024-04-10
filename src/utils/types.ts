export type Post = {
  title: string
  slug: string
  draft?: boolean
  publish_date: Date
  author: string
  description: string
  splash: string
  alt: string
  isNew: boolean
  isTrending: boolean
  tags: string[]
  splash_credits: string
  collection: string
}
export interface DbEntry extends Post {
  last_modified: string
}

interface last_update {
  last_update: string[]
}
interface db {
  [key: string]: DbEntry
}

export type DbSchema = last_update & db
