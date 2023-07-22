import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { DonorService } from './donor.service'
import { CreateDonorDto } from './dto/create-donor.dto'
import { Donor } from '@server/schema/drizzle'

@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) { }

  @Get('')
  async getAllDonor() {
    return this.donorService.list()
  }

  @Post('')
  async createDonor(@Body() createDonor: CreateDonorDto) {
    this.donorService.create(createDonor)
  }

  @Get(':id')
  async getDonor(@Param('id') id: string) {
    return this.donorService.findById(+id)
  }
}
