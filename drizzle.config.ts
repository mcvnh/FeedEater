import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './layer/base/server/database/schema.ts',
  out: './layer/base/server/database/migrations'
})