import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { SignupDto } from './dto'
import * as bcrypt from 'bcrypt'
import { Tokens } from './types'
import { UsersService } from '@server/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signup(dto: SignupDto): Promise<Tokens> {
    const userExists = await this.usersService.findByEmail(dto.email)

    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const hash = await this.hashData(dto.password)

    const newUser = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      refresh_token: '',
      hash
    })

    const tokens = await this.getTokens(newUser[0].id, newUser[0].role)

    await this.updateRefreshToken(newUser[0].id, tokens.refresh_token)

    return tokens
  }

  signin() {

  }



  logout() {

  }

  refreshToken() {

  }

  private async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)

    await this.usersService.update(id, {
      refresh_token: hashedRefreshToken,
    })
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10)
  }

  private async getTokens(id: number, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ])

    return {
      access_token,
      refresh_token,
    }
  }
}




