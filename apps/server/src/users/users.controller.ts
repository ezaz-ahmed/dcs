import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  async getAllUser() {
    return this.usersService.list()
  }

  @Post('/')
  async createUser(@Body() createUser: CreateUserDto) {
    this.usersService.create(createUser)
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(+id)
  }
}
