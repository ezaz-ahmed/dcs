import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { LoginDto, SignupDto } from './dto'
import * as argon2 from 'argon2'
import { Tokens } from '@server/common/types'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { DonorService } from '@server/donor/donor.service'

@Injectable()
export class AuthService {
  constructor(
    private donorService: DonorService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signup(dto: SignupDto): Promise<Tokens> {
    const donorExists = await this.donorService.findByEmail(dto.email)

    if (donorExists)
      throw new BadRequestException('User already exists')

    const hash = await this.hashData(dto.password)

    const newDonor = await this.donorService.create({
      name: dto.name,
      email: dto.email,
      hash
    })

    const tokens = await this.getTokens(newDonor.id, newDonor.name)

    await this.updateRefreshToken(newDonor.id, tokens.refresh_token)

    return tokens
  }

  async signin(loginDto: LoginDto) {
    const donor = await this.donorService.findByEmail(loginDto.email)

    if (!donor)
      throw new BadRequestException('User does not exist')

    const passwordMatches = await argon2.verify(
      donor.hash, loginDto.password
    )

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect')

    const tokens = await this.getTokens(donor.id, donor.name)
    await this.updateRefreshToken(donor.id, tokens.refresh_token)
    return tokens
  }

  logout(id: number) {
    return this.donorService.update(id, { refresh_token: null })
  }

  async refreshTokens(id: number, refreshToken: string) {
    const donor = await this.donorService.findById(id)

    if (!donor || !donor.refresh_token)
      throw new ForbiddenException('Access Denied')

    const refreshTokenMatches = await argon2.verify(
      donor.refresh_token,
      refreshToken
    )

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(donor.id, donor.name)
    await this.updateRefreshToken(donor.id, tokens.refresh_token)
    return tokens
  }

  private async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)

    await this.donorService.update(id, {
      refresh_token: hashedRefreshToken
    })
  }

  private hashData(data: string) {
    return argon2.hash(data)
  }

  private async getTokens(id: number, name: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          name
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '5s'
        }
      ),

      this.jwtService.signAsync(
        {
          sub: id,
          name
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
