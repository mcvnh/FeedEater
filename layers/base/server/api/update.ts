export default defineEventHandler(async () => {
  await runTask('articles:update')
  return { result: 'success' }
})