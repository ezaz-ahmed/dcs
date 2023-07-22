import { Inject, Injectable } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { Donor, donor } from '@server/schema/drizzle'
import { CreateDonorDto } from './dto/create-donor.dto'
import { eq } from 'drizzle-orm'
import { DonorInfo } from './type/donor-info'

@Injectable()
export class DonorService {
  constructor(@Inject(DB) private db: DbType) { }

  async list(): Promise<Donor[]> {
    return this.db.select().from(donor)
  }

  async create(createDonor: CreateDonorDto) {
    const result = await this.db
      .insert(donor)
      .values(createDonor)
      .returning({
        id: donor.id,
        name: donor.name
      })

    return result[0] as DonorInfo
  }

  async findById(id: number) {
    const result = await this.db
      .select()
      .from(donor)
      .where(eq(donor.id, id))

    return result[0] as Donor
  }

  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(donor)
      .where(eq(donor.email, email))

    return result[0] as Donor
  }

  async update(id: number, values: Partial<Donor>) {
    const result = await this.db
      .update(donor)
      .set(values)
      .where(eq(donor.id, id))

    return result[0] as Donor
  }

  async delete(id: number) {
    const result = await this.db
      .delete(donor)
      .where(eq(donor.id, id))

    return result[0]
  }
}
