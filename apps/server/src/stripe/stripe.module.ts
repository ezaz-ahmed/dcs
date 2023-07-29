import { Module, forwardRef } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { DonorModule } from '@server/donor/donor.module'
import { StripeController } from './stripe.controller'
import { DonationModule } from '@server/donation/donation.module'

@Module({
  imports: [DonorModule, forwardRef(() => DonationModule)],
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeController]
})
export class StripeModule { }
