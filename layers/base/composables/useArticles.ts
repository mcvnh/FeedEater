import { XMLParser } from "fast-xml-parser"

export const FEEDS = [
  { name: 'vnexpress', url: 'https://vnexpress.net/rss/tin-moi-nhat.rss' },
  { name: 'tinhte', url: 'https://tinhte.vn/rss' },
]

type FeedItem = {
  title: string;
  description: string;
  image: string;
  link: string;
  pubDate: string;
  feed: string;
}

export const useArticles = async (feedName: string) => {
  const feed = FEEDS.find((f) => f.name === feedName)
  const response = await $fetch(feed!.url, {
    method: 'GET',
    responseType: 'text',
  })

  const parser = new XMLParser({ ignoreAttributes: false })
  const feedDetails = parser.parse(response as string)

  const feeds = feedDetails.rss.channel.item.map((item: FeedItem) => {
    const descDom = `<root>${item.description}</root>`
    const desc = parser.parse(descDom)
    const description = desc['root']['#text'] ?? item.description

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
}