import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './drizzle/drizzle.module'
import { AuthModule } from './auth/auth.module'
import { DonorModule } from './donor/donor.module'
import { DonationModule } from './donation/donation.module'
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DrizzleModule,
    AuthModule,
    DonorModule,
    DonationModule,
    StripeModule,
  ],
})
export class AppModule { }
