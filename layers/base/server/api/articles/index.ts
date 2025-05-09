import { useDrizzle } from '#imports';
import { tables } from '../../../../database/server/utils/drizzle';

export default defineEventHandler(async () => {
  await runTask('articles:update')
  const articles = await useDrizzle().select().from(tables.articles).limit(50).all()
  return articles
})