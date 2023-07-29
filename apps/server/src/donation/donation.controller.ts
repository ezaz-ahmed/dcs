import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, RawBodyRequest, Req, UseGuards } from '@nestjs/common'
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
  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  async getAllFiltertedDonation(
    @GetCurrentUserId() donorId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.donationService.filteredList(donorId, page, limit)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async updateDeleteDonation(
    @Param('id') donationId: string
  ) {
    return this.donationService.delteDonation(+donationId)
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