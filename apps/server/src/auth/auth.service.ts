import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { LoginDto, SignupDto } from './dto'
import * as argon2 from 'argon2'
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

  async signin(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)

    if (!user) throw new BadRequestException('User does not exist')

    const passwordMatches = await argon2.verify(user.hash, loginDto.password)

    if (!passwordMatches) throw new BadRequestException('Password is incorrect')

    const tokens = await this.getTokens(user.id, user.role)
    await this.updateRefreshToken(user.id, tokens.refresh_token)
    return tokens
  }

  logout(id: number) {
    return this.usersService.update(id, { refresh_token: null })
  }

  refreshToken() { }

  private async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)

    await this.usersService.update(id, {
      refresh_token: hashedRefreshToken
    })
  }

  private hashData(data: string) {
    return argon2.hash(data)
  }

  private async getTokens(id: number, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          role
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          role
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d'
        }
      )
    ])

    return {
      access_token,
      refresh_token
    }
  }
}
