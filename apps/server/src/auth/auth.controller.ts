import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Tokens } from './types'
import { LoginDto, SignupDto } from './dto'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signup(dto)
  }

  @Post('/signin')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto)
  }

  @Get('logout')
  logout(@Req() req: Request) {
    // this.authService.logout(req.user['sub'])
  }

  @Post('/refresh')
  refreshToken() {
    this.authService.refreshToken()
  }
}
