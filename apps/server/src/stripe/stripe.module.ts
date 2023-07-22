import { Module } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { DonorModule } from '@server/donor/donor.module'

@Module({
  imports: [DonorModule],
  providers: [StripeService],
  exports: [StripeService]
})
export class StripeModule { }
