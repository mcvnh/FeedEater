import { useDrizzle } from '#imports';
import { desc } from 'drizzle-orm';
import { tables } from '../../utils/drizzle';

export default defineEventHandler(async () => {
  const articles = await useDrizzle().select().from(tables.articles).orderBy(desc(tables.articles.pubDate)).limit(50).all()
  return articles
})