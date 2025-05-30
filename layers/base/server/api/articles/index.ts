import { useDrizzle } from '#imports';
import { desc, like } from 'drizzle-orm';
import { tables } from '../../utils/drizzle';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = parseInt(query.page as string) || 1;
  const pageSize = parseInt(query.pageSize as string) || 20;
  const offset = (page - 1) * pageSize;
  const search = query.search as string || '';
  const sqlQuery = useDrizzle().select().from(tables.articles)

  if (search) {
    sqlQuery.where(
      or(
        like(tables.articles.title, `%${search.toLowerCase()}%`),
        like(tables.articles.description, `%${search.toLowerCase()}%`)
      )
    );
  }

  sqlQuery.orderBy(desc(tables.articles.pubDate))
    .limit(pageSize)
    .offset(offset);

  const articles = await sqlQuery.all();

  const totalCount = !search
    ? await useDrizzle().select({ count: sql<number>`count(id)`}).from(tables.articles)
    : await useDrizzle().select({ count: sql<number>`count(id)`}).from(tables.articles).where(
      or(
        like(tables.articles.title, `%${search.toLowerCase()}%`),
        like(tables.articles.description, `%${search.toLowerCase()}%`)
      )
    ).all();

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