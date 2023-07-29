import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '@server/common/types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_ADMIN_ACCESS_SECRET')
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
