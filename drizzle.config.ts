import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './layers/database/server/database/schema.ts',
  out: './layers/database/server/database/migrations'
})