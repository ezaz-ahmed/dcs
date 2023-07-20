import { serial, text, pgTable } from 'drizzle-orm/pg-core'
import { InferModel } from 'drizzle-orm'

export const users = pgTable('user', {
  user_id: serial('user_id').primaryKey(),
  email: text('email'),
})

export type User = InferModel<typeof users>