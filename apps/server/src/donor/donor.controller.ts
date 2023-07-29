import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { DonorService } from './donor.service'
import { CreateDonorDto } from './dto/create-donor.dto'
import { Donor } from '@server/schema/drizzle'
import { AccessTokenGuard } from '@server/common/guard/accessToken.guard'

@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) { }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllDonor() {
    return this.donorService.list()
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createDonor(@Body() createDonor: CreateDonorDto) {
    this.donorService.create(createDonor)
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getDonor(@Param('id') id: string) {
    return this.donorService.findById(+id)
  }
}
