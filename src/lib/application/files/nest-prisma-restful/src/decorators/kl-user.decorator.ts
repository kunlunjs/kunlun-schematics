import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

export const KLUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (key && request.user) {
      return request.user[key]
    }
    return request.user
  }
)
