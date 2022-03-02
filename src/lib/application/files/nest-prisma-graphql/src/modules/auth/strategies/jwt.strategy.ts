import { Injectable, UnauthorizedException } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from 'src/modules/auth/auth.service'
import type { JwtDto } from 'src/modules/auth/dto/jwt.dto'

/**
 * PassportStrategy 可接受第二个参数，当有多个同类型 Strategy 时做区分
 * @example class LocalStrategy extends PassportStrategy(Strategy, 'local-strategy-user')
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    // https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUserId(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
