import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'
import { JwtPayload } from '@server/common/types'

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {

    const request: Express.Request = context.switchToHttp().getRequest()

    const user = request.user as JwtPayload
    return user.sub
  }
)
