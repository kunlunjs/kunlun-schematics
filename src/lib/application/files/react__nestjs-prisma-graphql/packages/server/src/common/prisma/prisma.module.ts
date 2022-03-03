import type { DynamicModule, Provider } from '@nestjs/common'
import { Module } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  PrismaOptionsFactory
} from './interfaces'
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: options.prismaServiceOptions
        }
      ]
    }
  }

  static forRootAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options)
    }
  }

  private static createAsyncProviders(
    options: PrismaModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProvider(options)
    }
    if (options.useClass) {
      return [
        ...this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass
        }
      ]
    }
    return []
  }

  private static createAsyncOptionsProvider(
    options: PrismaModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        }
      ]
    }
    return [
      {
        provide: PRISMA_SERVICE_OPTIONS,
        useFactory: async (optionsFactory: PrismaOptionsFactory) =>
          await optionsFactory.createPrismaOptions(),
        inject:
          options.useExisting || options.useClass
            ? [options.useExisting || options.useClass]
            : []
      }
    ] as Provider[]
  }
}
