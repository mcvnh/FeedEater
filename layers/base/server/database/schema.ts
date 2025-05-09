import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const feeds = sqliteTable('feeds', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
})


export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const feedsTags = sqliteTable('feeds_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  feedId: integer('feed_id').notNull().references(() => feeds.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  tagId: integer('tag_id').notNull().references(() => tags.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
})

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  globalId: text('global_id').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  image: text('image'),
  link: text('link').notNull().unique(),
  pubDate: integer('pub_date', { mode: 'timestamp_ms' }).notNull(),
  feedId: integer('feed_id')
    .notNull()
    .references(() => feeds.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})