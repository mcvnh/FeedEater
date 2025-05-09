import { useArticles } from '../../../composables/useArticles';

export default defineEventHandler(async () => {
  const vnexpress = await useArticles('vnexpress')
  const tinhte = await useArticles('tinhte')

  return [
    ...vnexpress,
    ...tinhte,
  ].sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  })
})