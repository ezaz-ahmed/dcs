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
import { Response } from 'express'
import { RefreshTokenGuard } from '@server/common/guard/refreshToken.guard'
import { AccessTokenGuard } from '@server/common/guard/accessToken.guard'
import {
  Public,
  GetCurrentUser,
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

    res.cookie('jid', tokens.refresh_token, {
      httpOnly: true,
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

    res.cookie('jid', tokens.refresh_token, {
      httpOnly: true,
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
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.refreshTokens(userId, refreshToken)

    res.cookie('jid', tokens.refresh_token, {
      httpOnly: true,
    })

    return {
      access_token: tokens.access_token
    }
  }
}
