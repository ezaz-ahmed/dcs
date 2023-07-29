import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common'
import { Public } from '@server/common/decorator'
import { Request } from 'express'
import { StripeService } from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Public()
  @Post("/hook")
  create(@Req() req: RawBodyRequest<Request>) {
    const rawBody = req.rawBody
    const sig = req.headers['stripe-signature']

    this.stripeService.stripeHook(sig, rawBody)
  }
}
