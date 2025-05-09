import { useDrizzle } from '#imports';
import { tables } from '../../utils/drizzle';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const name = event.context.params?.name
  const feed = await useDrizzle().select().from(tables.feeds).where(eq(tables.feeds.name, name)).get()
  const articles = await useDrizzle().select().from(tables.articles).where(eq(tables.articles.feedId, feed.id)).all()
  return articles
})