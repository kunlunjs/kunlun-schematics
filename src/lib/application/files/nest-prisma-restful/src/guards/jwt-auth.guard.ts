import type { ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import type { Request } from 'express'
import type { Observable } from 'rxjs'
import { IS_PUBLIC_API } from '@/constants'

/**
 * 允许使用策略链 AuthGuard(['strategy1', 'strategy2'])，依次进行所有都失败则失败
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  // handleRequest(err: any, user: any, info: any, context: any, status?: any) {
  //   return user
  // }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_API, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    if ((req.headers.host || '').indexOf('admin.') < 0) {
      return true
    }
    return super.canActivate(context)
  }
}
