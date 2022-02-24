import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { Chance } from 'chance'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const chance = new Chance()

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    appService = app.get<AppService>(AppService)
  })

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!')
    })
  })

  describe('getHelloName', () => {
    it('should return "Hello ${name}!"', () => {
      const name = chance.name()
      expect(appService.getHelloName(name)).toBe(`Hello ${name}!`)
    })
  })
})
