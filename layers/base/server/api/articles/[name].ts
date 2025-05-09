import { useArticles } from './../../../composables/useArticles';
export default defineEventHandler(async (event) => {
  const name = event.context.params?.name
  const articles = useArticles(name)
  return articles
})