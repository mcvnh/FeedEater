import { XMLParser } from "fast-xml-parser"

export const useFetchFeed = async (url: string) => {
  const response = await $fetch(url, {
    method: 'GET',
    responseType: 'text',
  })

  const parser = new XMLParser({ ignoreAttributes: false })
  const feedDetails = parser.parse(response as string)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const feeds = feedDetails.rss.channel.item.map((item: any) => {
    const descDom = `<root>${item.description}</root>`
    const desc = parser.parse(descDom)
    const description = desc['root']['#text'] ?? item.description

    const guid = typeof item.guid === 'object' ? item.guid['#text'] : item.guid

    return {
      title: item.title,
      guid,
      description: description,
      link: item.link,
      pubDate: item.pubDate,
    }
  })

  return feeds
}