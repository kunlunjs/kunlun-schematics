import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import type { SecurityConfig } from 'src/common/configs/config.interface'
import { GqlAuthGuard } from 'src/guards'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.stategy'
import { PasswordService } from './password.service'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig?.expiresIn
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService
  ],
  exports: [GqlAuthGuard]
})
export class AuthModule {}
