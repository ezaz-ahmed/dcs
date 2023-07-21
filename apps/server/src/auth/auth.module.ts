import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies'
import { DonorModule } from '@server/donor/donor.module'

@Module({
  imports: [DonorModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthModule { }
