import { tables } from '../utils/drizzle';
import { useDrizzle } from '#imports'

export const FEEDS = [
  { name: 'vnexpress', url: 'https://vnexpress.net/rss/tin-moi-nhat.rss' },
  { name: 'tinhte', url: 'https://tinhte.vn/rss' },
]

export default defineEventHandler(async () => {
  return useDrizzle().select().from(tables.feeds).all()
})