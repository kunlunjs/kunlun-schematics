import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from '../auth.service'

/**
 * PassportStrategy 可接受第二个参数，当有多个同类型 Strategy 时做区分
 * @example class LocalStrategy extends PassportStrategy(Strategy, 'local-strategy-user')
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    /**
     * 自定义登录请求字段名
     * @see https://docs.nestjs.com/security/authentication#customize-passport
     * @default
     *   super({
     *     usernameField: 'username',
     *     passwordField: 'passport'
     *   })
     */
    super({
      usernameField: 'email',
      passwordField: 'passport'
    })
  }

  async validate(email: string, passport: string) {
    const user = await this.authService.validateUserEmail(email)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
