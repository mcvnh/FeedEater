import { XMLParser } from 'fast-xml-parser';

type FeedItem = {
  title: string;
  description: string;
  image: string;
  link: string;
  pubDate: string;
  feed: string;
}

export default defineEventHandler(async (event) => {
  const response = await $fetch(`https://vnexpress.net/rss/tin-moi-nhat.rss`, {
    method: 'GET',
  })

  const parser = new XMLParser({ ignoreAttributes: false })
  const feed = parser.parse(response)

  const feeds = feed.rss.channel.item.map((item: FeedItem) => {
    const newParser = new XMLParser({ ignoreAttributes: true, preserveOrder: true })
    const desc = newParser.parse('<root>' + item.description + '</root>')
    const description = desc[0]['root'][1]['#text']

    return {
      title: item.title,
      description: description,
      image: item['media:content']?.['@_url'] || '',
      link: item.link,
      pubDate: item.pubDate,
      feed: 'vnexpress',
    }
  })

  return feeds
})