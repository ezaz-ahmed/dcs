import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common'
import { DB, DbType } from '@server/drizzle/db.provider'
import { Donation, donation } from '@server/schema/drizzle'
import { CreateDonation } from './dto'
import { eq } from 'drizzle-orm'
import { StripeService } from '@server/stripe/stripe.service'

@Injectable()
export class DonationService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly stripeService: StripeService
  ) { }

  async list(donorId: number): Promise<Donation[]> {
    return this.db
      .select()
      .from(donation)
      .where(eq(donation.donor_id, donorId))
  }

  async create(donorId: number, createDonation: CreateDonation) {
    try {

      const [_, paymentIntent] = await Promise.all([
        this.db
          .insert(donation)
          .values({
            donor_id: donorId,
            amount: createDonation.amount,
            status: 'pending',
            description: createDonation.description
          }),
        this.stripeService.createIntent({
          amount: createDonation.amount,
          description: createDonation.description,
          donor_id: donorId,
          currency: createDonation.currency
        })
      ])

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
}


