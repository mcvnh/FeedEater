import { useDrizzle } from '#imports';
import { tables } from '../../utils/drizzle';

export default defineEventHandler(async () => {
  const articles = await useDrizzle().select().from(tables.articles).limit(50).all()
  return articles
})