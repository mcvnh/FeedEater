import { useDrizzle } from '#imports';
import { tables } from '../../utils/drizzle';
import { desc, eq, like } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = getRouterParams(event);

  const page = parseInt(query.page as string) || 1;
  const pageSize = parseInt(query.pageSize as string) || 20;
  const offset = (page - 1) * pageSize;
  const search = query.search as string || '';

  const name = params.name
  const feed = await useDrizzle().select().from(tables.feeds).where(eq(tables.feeds.name, name)).get()

  const articles = await useDrizzle().select().from(tables.articles).where(
    and(
      eq(tables.articles.feedId, feed!.id),
      or(
        like(tables.articles.title, `%${search.toLowerCase()}%`),
        like(tables.articles.description, `%${search.toLowerCase()}%`)
      )
    ))
    .orderBy(desc(tables.articles.pubDate))
    .limit(pageSize)
    .offset(offset)
    .all()


  const totalCount = !search
  ? await useDrizzle().select({ count: sql<number>`count(id)`}).from(tables.articles).where(eq(tables.articles.feedId, feed!.id))
  : await useDrizzle().select({ count: sql<number>`count(id)`}).from(tables.articles).where(
    and(
      eq(tables.articles.feedId, feed!.id),
      or(
        like(tables.articles.title, `%${search.toLowerCase()}%`),
        like(tables.articles.description, `%${search.toLowerCase()}%`)
      )
    )
  ).all();

  console.log(search)
  const totalPages = Math.ceil(totalCount[0].count / pageSize);

  return {
    articles,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount[0].count,
      totalPages,
    },
  };
})