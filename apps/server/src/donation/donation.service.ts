import { HttpException, HttpStatus, Inject, Injectable, Logger, forwardRef } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { Donation, donation } from '@server/schema/drizzle'
import { CreateDonation } from './dto'
import { and, eq, ne } from 'drizzle-orm'
import { StripeService } from '@server/stripe/stripe.service'
import { DonationReposne, PaginationResponse } from '@server/common/types'


@Injectable()
export class DonationService {
  constructor(
    @Inject(DB) private db: DbType,
    @Inject(forwardRef(() => StripeService))
    private stripeService: StripeService
  ) { }

  async list(donorId: number): Promise<Donation[]> {
    return this.db
      .select()
      .from(donation)
      .where(eq(donation.donor_id, donorId))
  }

  async create(donorId: number, createDonation: CreateDonation) {
    try {
      const paymentIntent = await this.stripeService.createIntent({
        amount: createDonation.amount,
        description: createDonation.description,
        donor_id: donorId,
        currency: createDonation.currency
      })

      const _ = await this.db
        .insert(donation)
        .values({
          donor_id: donorId,
          amount: createDonation.amount,
          status: 'pending',
          description: createDonation.description,
          pi_id: paymentIntent.id
        })

      return {
        secret: paymentIntent.client_secret,
        status: paymentIntent.status
      }

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Payment Intent Fail',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async delteDonation(donationId: number) {
    const result = await this.db
      .update(donation)
      .set({
        status: 'delete'
      })
      .where(eq(donation.id, donationId))

    return result[0] as Donation
  }

  async filteredList(donorId: number, page = 1, limit = 10): Promise<PaginationResponse<DonationReposne>> {
    const offset = (page - 1) * limit

    const [totalItems, items] = await Promise.all([
      this
        .db
        .select()
        .from(donation)
        .where(and(
          eq(donation.donor_id, donorId),
          ne(donation.status, "delete"))
        ),
      this.db
        .select({
          id: donation.id,
          amount: donation.amount,
          date: donation.created_at,
          currency: donation.currency,
          status: donation.status,
          description: donation.description,
        })
        .from(donation)
        .where(and(
          eq(donation.donor_id, donorId),
          ne(donation.status, "delete"))
        ).
        orderBy(donation.id)
        .limit(limit)
        .offset(offset)
    ])

    const totalPages = Math.ceil(totalItems.length / limit)

    return {
      items,
      totalItems: totalItems.length,
      totalPages,
      currentPage: page,
    }
  }

  async update(id: number, values: Partial<Donation>) {
    const result = await this.db
      .update(donation)
      .set(values)
      .where(eq(donation.id, id))

    return result[0] as Donation
  }

  async updateByPi(pi: string, values: Partial<Donation>) {
    const result = await this.db
      .update(donation)
      .set(values)
      .where(eq(donation.pi_id, pi))

    return result[0] as Donation
  }
}


