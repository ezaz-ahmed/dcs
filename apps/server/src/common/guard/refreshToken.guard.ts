import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const refreshToken = request.cookies['jid']
    if (!refreshToken)
      throw new ForbiddenException("Authentication error: No JWT token found.")

    return super.canActivate(context) && !!refreshToken
  }
}