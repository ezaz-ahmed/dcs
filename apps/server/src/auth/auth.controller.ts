import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, SignupDto } from './dto'
import { Request, Response } from 'express'
import { RefreshTokenGuard } from '@server/common/guard/refreshToken.guard'
import { AccessTokenGuard } from '@server/common/guard/accessToken.guard'
import {
  Public,
  GetCurrentUserId
} from '@server/common/decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.signup(dto)

    const server_days = 7 * 24 * 60 * 60 * 1000

    res.cookie('jid', tokens.refresh_token, {
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

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.signin(loginDto)

    const server_days = 7 * 24 * 60 * 60 * 1000

    res.cookie('jid', tokens.refresh_token, {
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

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response
  ) {

    res.clearCookie('jid', {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'none',
    })

    this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {

    const refreshToken = req.cookies['jid']

    const tokens = await this.authService.refreshTokens(userId, refreshToken)

    const server_days = 7 * 24 * 60 * 60 * 1000

    res.cookie('jid', tokens.refresh_token, {
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
}
