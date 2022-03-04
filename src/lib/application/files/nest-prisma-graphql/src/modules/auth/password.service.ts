import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import { compare, hash } from 'bcrypt'
import type { SecurityConfig } from 'src/common/configs/config.interface'

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const saltOrRounds = securityConfig!.bcryptSaltOrRound

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds
  }

  constructor(private readonly configService: ConfigService) {}

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  hashPassword(passport: string): Promise<string> {
    return hash(passport, this.bcryptSaltRounds)
  }
}
