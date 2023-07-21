import { InferModel } from 'drizzle-orm'
import { serial, text, timestamp, pgTable, varchar, pgEnum } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),

  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hash: varchar('hash', { length: 255 }).notNull(),
  refresh_token: varchar('refresh_token', { length: 255 }),
  role: text('role').default('donor').$type<'admin' | 'donor'>().notNull(),
})

export type User = InferModel<typeof user>
export type NewUser = InferModel<typeof user, 'insert'>
