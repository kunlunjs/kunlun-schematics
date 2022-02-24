import { Injectable, UnauthorizedException } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from 'src/modules/auth/auth.service'
import type { JwtDto } from 'src/modules/auth/dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: configService.get('JWT_ACCESS_SECRET')
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
