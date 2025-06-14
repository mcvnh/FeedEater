import { useFetchFeed } from '~/layers/base/composables/useFetchFeed';
import { tables, useDrizzle, type Article } from "../../utils/drizzle"

export default defineTask({
  meta: {
    name: 'articles:update',
    description: 'Update articles from feeds',
  },
  async run() {
    console.log('Running articles:update task...')
    const feeds = await useDrizzle().select().from(tables.feeds).all()

    for (const feed of feeds) {
      console.log(`Updating articles for feed: ${feed.name} (${feed.url})`)

      const upcomingArticles = await useFetchFeed(feed.url)

      const feedArticles: Article[] = upcomingArticles.map((article: any) => {
        return {
          feedId: feed.id,
          title: article.title,
          description: article.description,
          image: article.image,
          link: article.link,
          pubDate: new Date(article.pubDate),
          globalId: article.guid,
        }
      })

      for (const article of feedArticles) {
        try {
          await useDrizzle().insert(tables.articles).values(article).execute()
        } catch {
          console.debug('Error inserting article:', article.title)
        }
      }

      await useDrizzle().update(tables.feeds).set({ lastSyncAt: new Date() }).where(eq(tables.feeds.id, feed.id)).execute()
    }

    return { result: 'success'  }
  },
})