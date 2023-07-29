import { Module, forwardRef } from '@nestjs/common'
import { DonationController } from './donation.controller'
import { DonationService } from './donation.service'
import { DonorModule } from '@server/donor/donor.module'
import { StripeModule } from '@server/stripe/stripe.module'

@Module({
  imports: [DonorModule, forwardRef(() => StripeModule)],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService]
})
export class DonationModule { }
