import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from '@server/common/types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-admin'
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => request.cookies['jid-admin']]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ADMIN_REFRESH_SECRET'),
    })
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload
  }
}
