import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { LoginAdminDto } from './dto/login-admin.dto'
import * as argon2 from 'argon2'
import { DB, DbType } from '@server/drizzle/db.provider'
import { Admin, admin } from '@server/schema/drizzle'
import { eq } from 'drizzle-orm'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AdminService {
  constructor(
    @Inject(DB) private db: DbType,
    private jwtService: JwtService,
    private configService: ConfigService) { }

  async login(loginDto: LoginAdminDto) {
    const admin = await this.findOneAdmin(loginDto.username)

    if (!admin)
      throw new BadRequestException('Admin does not exist')

    const passwordMatches = await argon2.verify(
      admin.hash, loginDto.password
    )

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect')

    const tokens = await this.getTokens(admin.id, admin.username)

    await this.updateRefreshToken(admin.id, tokens.refresh_token)
    return tokens
  }

  async create(createAdminDto: CreateAdminDto) {

    const hash = await this.hashData(createAdminDto.password)

    const result = await this
      .db
      .insert(admin)
      .values({
        username: createAdminDto.username,
        hash
      })

    return result[0] as Admin
  }


  async findOneAdmin(username: string) {
    const result = await this.db
      .select()
      .from(admin)
      .where(eq(admin.username, username))

    return result[0] as Admin
  }

  async update(id: number, values: Partial<Admin>) {
    const result = await this.db
      .update(admin)
      .set(values)
      .where(eq(admin.id, id))

    return result[0] as Admin
  }

  private async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)

    await this.update(id, {
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
          secret: this.configService.get<string>('JWT_ADMIN_ACCESS_SECRET'),
          expiresIn: '15m'
        }
      ),

      this.jwtService.signAsync(
        {
          sub: id,
          name
        },
        {
          secret: this.configService.get<string>('JWT_ADMIN_REFRESH_SECRET'),
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
