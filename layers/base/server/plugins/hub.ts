import { inArray } from 'drizzle-orm'
import fs from 'fs'
import yaml from 'js-yaml'

export default defineNitroPlugin(() => {
  hubHooks.hook('bindings:ready', async () => {
    console.log('Loading feeds from feeds.yml')
    const feeds = yaml.load(fs.readFileSync('feeds.yml', 'utf8')) as {name: string, url: string}[]

    console.log('Feeds:', feeds)
    const feedNames = feeds.map((feed) => feed.name)
    const existingFeeds = await useDrizzle().select().from(tables.feeds).all()

    const shouldDeleteFeeds = existingFeeds.filter((feed) => !feedNames.includes(feed.name))
    if (shouldDeleteFeeds.length > 0) {
      await useDrizzle().delete(tables.feeds).where(inArray(tables.feeds.name, shouldDeleteFeeds.map((feed) => feed.name))).execute()
      console.log('Deleted feeds:', shouldDeleteFeeds)
    }

    const newFeeds = feeds.filter((feed) => !existingFeeds.map((f) => f.name).includes(feed.name))
    if (newFeeds.length > 0) {
      await useDrizzle().insert(tables.feeds).values(newFeeds.map((feed) => ({
        name: feed.name,
        url: feed.url,
      }))).execute()
      console.log('Inserted feeds:', newFeeds)
    }

    console.log('Updating feeds...')
    await runTask('articles:update')

    console.log('Completing feeds update')
  })
})