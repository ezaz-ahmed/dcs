import { Inject, Injectable, Logger } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { User, user } from '@server/schema/users'
import * as argon2 from 'argon2'
import { eq, sql } from 'drizzle-orm'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateUserResponse } from './types'

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private db: DbType) { }

  async list(): Promise<User[]> {
    return this.db.select().from(user)
  }

  async create(createUser: CreateUserDto): Promise<CreateUserResponse> {
    return await this.db.insert(user).values(createUser).returning({ id: user.id, role: user.role })
  }


  async findById(id: number) {
    const result = await this.db.select().from(user).where(eq(user.id, id))

    return result.length === 0 ? null : result[0]
  }

  async findByEmail(email: string) {
    const result = await this.db.select().from(user).where(eq(user.email, email))

    return result.length === 0 ? null : result[0]
  }

  async update(id: number, values: Partial<User>) {
    const result = await this.db
      .update(user)
      .set(values)
      .where(eq(user.id, id))

    return result[0]
  }

  async delete(id: number) {
    const result = await this.db.delete(user).where(eq(user.id, id))

    return result[0]
  }

  private hashData(data: string) {
    return argon2.hash(data)
  }
}