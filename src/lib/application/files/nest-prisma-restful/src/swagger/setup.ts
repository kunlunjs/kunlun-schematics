import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import pkg from '../../package.json'

/**
 * swagger
 * @param app
 * @see https://docs.nestjs.com/openapi/introduction#installation
 */
export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Interface Document')
    // .setDescription(``) // support html
    .setVersion(pkg.version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    // https://docs.nestjs.com/openapi/types-and-parameters#extra-models
    extraModels: []
  })
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
    customSiteTitle: 'Interface Document'
  })
}
