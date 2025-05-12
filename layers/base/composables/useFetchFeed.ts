import RssParser from 'rss-parser'

export const useFetchFeed = async (url: string) => {
  const response = await $fetch(url, {
    method: 'GET',
    responseType: 'text',
  })

  const rssParser = new RssParser();
  const data = await rssParser.parseString(response as string)

  const articles = data.items.map((item) => {
    return {
      title: item.title,
      guid: item.guid,
      description: (item.content ?? "").replace(/<[^>]*>?/gm, ''),
      link: item.link,
      pubDate: item.pubDate,
    }
  })

  return articles
}