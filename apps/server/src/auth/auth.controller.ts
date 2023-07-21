import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Tokens } from './types'
import { SignupDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  signup(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signup(dto)
  }

  @Post('/signin')
  signin() { }

  @Post('/logout')
  logout() {

  }

  @Post('/refresh')
  refreshToken() {
    this.authService.refreshToken()
  }
}
