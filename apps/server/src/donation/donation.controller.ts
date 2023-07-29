import { Body, Controller, Get, HttpCode, HttpStatus, Post, RawBodyRequest, Req, UseGuards } from '@nestjs/common'
import { DonationService } from './donation.service'
import { CreateDonation } from './dto'
import { AccessTokenGuard } from '@server/common/guard/accessToken.guard'
import { GetCurrentUserId, Public } from '@server/common/decorator'

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) { }

  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getAllDonation(@GetCurrentUserId() donorId: number,) {
    return this.donationService.list(donorId)
  }

  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createDonation(
    @GetCurrentUserId() donorId: number,
    @Body() createDonation: CreateDonation
  ) {
    return this.donationService.create(donorId, createDonation)
  }
}