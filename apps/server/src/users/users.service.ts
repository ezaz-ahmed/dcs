import { Inject, Injectable } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { User, users } from '@server/schema/users'

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: DbType) { }

  async list(): Promise<User[]> {
    return this.db.select().from(users)
  }
}