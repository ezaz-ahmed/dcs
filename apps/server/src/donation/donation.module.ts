import { Module } from '@nestjs/common'
import { DonationController } from './donation.controller'
import { DonationService } from './donation.service'
import { DonorModule } from '@server/donor/donor.module'
import { StripeModule } from '@server/stripe/stripe.module'

@Module({
  imports: [DonorModule, StripeModule],
  controllers: [DonationController],
  providers: [DonationService]
})
export class DonationModule { }
