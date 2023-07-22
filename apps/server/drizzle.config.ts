import type { Config } from 'drizzle-kit'

// @ts-ignore
import * as dotenv from 'dotenv' // installed by @nestjs/config

dotenv.config()

export default {
  strict: false,
  schema: './src/schema/*',
  driver: 'pg',
  out: './sql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config