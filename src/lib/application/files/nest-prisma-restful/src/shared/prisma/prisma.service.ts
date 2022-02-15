import type {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { Inject, Optional } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PRISMA_SERVICE_OPTIONS } from '@/constants'
import type { PrismaServiceOptions } from '@/interfaces'

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
