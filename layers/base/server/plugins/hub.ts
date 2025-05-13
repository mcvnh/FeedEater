import { inArray } from 'drizzle-orm'
import fs from 'fs'
import yaml from 'js-yaml'

export default defineNitroPlugin(() => {
  onHubReady(async () => {
    const feeds = yaml.load(fs.readFileSync('feeds.yml', 'utf8')) as {name: string, url: string}[]

    const feedNames = feeds.map((feed) => feed.name)
    const existingFeeds = await useDrizzle().select().from(tables.feeds).all()

    const shouldDeleteFeeds = existingFeeds.filter((feed) => !feedNames.includes(feed.name))
    if (shouldDeleteFeeds.length > 0) {
      await useDrizzle().delete(tables.feeds).where(inArray(tables.feeds.name, shouldDeleteFeeds.map((feed) => feed.name))).execute()
    }

    const allNames = existingFeeds.map((feed) => feed.name)
    const newFeeds = feeds.filter((feed) => !allNames.includes(feed.name))
    if (newFeeds.length > 0) {
      const insertFeeds = newFeeds.map((feed) => ({
        name: feed.name,
        url: feed.url,
      }))
      await useDrizzle().insert(tables.feeds).values(insertFeeds).execute()
    }

    await runTask('articles:update')
  })
})