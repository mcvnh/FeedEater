import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const feeds = sqliteTable('feeds', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`now()`).$onUpdate(() => new Date()),
})


export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`),
  updatedAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`).$onUpdate(() => new Date()),
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
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`),
  updatedAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`).$onUpdate(() => new Date()),
})

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  globalId: text('global_id').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  image: text('image'),
  link: text('link').notNull().unique(),
  pubDate: integer('pub_date', { mode: 'timestamp' }).notNull(),
  feedId: integer('feed_id')
    .notNull()
    .references(() => feeds.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`now()`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`now()`).$onUpdate(() => new Date()),
})