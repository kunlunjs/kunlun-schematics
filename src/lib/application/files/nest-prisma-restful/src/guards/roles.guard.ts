import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Reflector } from '@nestjs/core'
import type { Observable } from 'rxjs'
import { ROLES_KEY } from '../constants'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<(string | number)[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (!roles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    return user && roles.some(role => user.roles?.includes(role))
  }
}
