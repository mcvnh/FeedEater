import * as schema from '../database/schema'
import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'


export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Feed = typeof schema.feeds.$inferInsert
export type Article = typeof schema.articles.$inferInsert
export type Tag = typeof schema.tags.$inferInsert
export type FeedTag = typeof schema.feedsTags.$inferInsert