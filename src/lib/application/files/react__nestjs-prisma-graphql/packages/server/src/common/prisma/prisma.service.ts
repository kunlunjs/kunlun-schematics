import type {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { Inject, Optional, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaServiceOptions } from './interfaces'
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private readonly prismaServiceOptions: PrismaServiceOptions = {}
  ) {
    super(prismaServiceOptions.prismaOptions)

    if (this.prismaServiceOptions.middlewares) {
      this.prismaServiceOptions.middlewares.forEach(middleware => {
        this.$use(middleware)
      })
    }
  }

  async onModuleInit() {
    if (this.prismaServiceOptions.explicitConnect) {
      await this.$connect()
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async truncate() {}

  async truncateTable() {}

  async resetSequences() {}
}
