import { Inject, Injectable } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { Donor, donor } from '@server/schema/donor'
import { CreateDonorDto } from './dto/create-donor.dto'
import { eq } from 'drizzle-orm'
import { DonorInfo } from './type/donor-info'

@Injectable()
export class DonorService {
  constructor(@Inject(DB) private db: DbType) { }

  async list(): Promise<Donor[]> {
    return this.db.select().from(donor)
  }

  async create(createDonor: CreateDonorDto):
    Promise<DonorInfo> {
    return await this.db
      .insert(donor)
      .values(createDonor)
      .returning({ id: donor.id, name: donor.name })
  }

  async findById(id: number):
    Promise<Donor | null> {
    const result = await this.db
      .select()
      .from(donor)
      .where(eq(donor.id, id))

    return result.length === 0 ? null : result[0]
  }

  async findByEmail(email: string):
    Promise<Donor | null> {
    const result = await this.db
      .select()
      .from(donor)
      .where(eq(donor.email, email))

    return result.length === 0 ? null : result[0]
  }

  async update(id: number, values: Partial<Donor>) {
    const result = await this.db
      .update(donor)
      .set(values)
      .where(eq(donor.id, id))

    return result[0]
  }

  async delete(id: number) {
    const result = await this.db
      .delete(donor)
      .where(eq(donor.id, id))

    return result[0]
  }
}
