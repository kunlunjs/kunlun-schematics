import type { NestMiddleware } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { isUndefined } from 'lodash'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '@/shared/prisma'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (isUndefined(req.user) && authorization && authorization.split(' ')[1]) {
      const token = authorization.split(' ')[1] as string
      const JWT_SECRET_KEY = await this.configService.get('JWT_SECRET_KEY')
      const decoded = jwt.verify(token, JWT_SECRET_KEY)
      if (decoded) {
        req.user = decoded
      }
    }
    if (req.user?.id) {
      const isExist = await new Promise<boolean>(resolve => {
        setTimeout(() => {
          resolve(true)
        })
      })
      if (!isExist) {
        throw new ForbiddenException('Unauthorized')
      }
    }
    next()
  }
}
