import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { LoginAdminDto } from './dto/login-admin.dto'
import { Response } from 'express'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() loginDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {

    const tokens = await this.adminService.login(loginDto)

    const server_days = 7 * 24 * 60 * 60 * 1000

    res.cookie('jwt', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: server_days,
      sameSite: 'none',
      path: '/'
    })

    return {
      access_token: tokens.access_token
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createDto: CreateAdminDto,
  ) {
    await this.adminService.create(createDto)

    return {
      message: "New Admin Created"
    }
  }
}
