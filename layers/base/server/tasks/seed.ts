import { tables, useDrizzle, type Feed } from "../utils/drizzle"

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task'
  },
  async run() {
    console.log('Running DB seed task...')
    const feeds: Feed[] = [
      {
        name: 'vnexpress',
        url: 'https://vnexpress.net/rss/tin-moi-nhat.rss',
      },
      {
        name: 'tinhte',
        url: 'https://tinhte.vn/rss',
      }
    ]

    await useDrizzle().insert(tables.feeds).values(feeds).execute()
    return { result: 'success' }
  }
})