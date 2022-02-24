import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { JwtService } from '@nestjs/jwt'
import type { User } from '@prisma/client'
import { Prisma } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'src/common/prisma/prisma.service'
import type { SecurityConfig } from 'src/interfaces'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SignupInput } from './dto/signup.input'
import type { TokenModel } from './models/token.model'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(payload: SignupInput): Promise<TokenModel> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    )

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER'
        }
      })

      return this.generateTokens({
        userId: user.id
      })
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw e // new Error(e)
      }
    }
  }

  async login(email: string, password: string): Promise<TokenModel> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    )

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    return this.generateTokens({
      userId: user.id
    })
  }

  validateUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }

  getUserFromToken(token: string): Promise<User | null> {
    const id = (this.jwtService.decode(token) as Record<'userId', string>)[
      'userId'
    ] as string
    return this.prisma.user.findUnique({ where: { id } })
  }

  generateTokens(payload: { userId: string }): TokenModel {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    }
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload)
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig!.refreshIn
    })
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET')
      })

      return this.generateTokens({
        userId
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
