export type DbSchema = {
  [key: string]: {
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
    last_modified: Date
  }
}
