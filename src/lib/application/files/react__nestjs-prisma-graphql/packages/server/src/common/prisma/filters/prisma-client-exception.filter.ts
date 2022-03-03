import type { ArgumentsHost } from '@nestjs/common'
import { HttpStatus, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import type { Response } from 'express'

/**
 * {@link PrismaClientExceptionFilter} handling {@link Prisma.PrismaClientKnownRequestError} exceptions.
 *
 * Error code definition for Prisma Client (Query Engine)
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost
  ): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    switch (exception.code) {
      case 'P2000':
        this.catchValueTooLong(exception, response)
        break
      case 'P2002':
        this.catchUniqueConstraint(exception, response)
        break
      case 'P2025':
        this.catchNotFound(exception, response)
      // TODO
      // default:
      //   this.unhandleException(exception, host)
      //   break
    }
  }

  /**
   * Catches P2000 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2000
   *
   * @param exception P2000
   * @param response 400 Bad Request
   */
  catchValueTooLong(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response
  ) {
    const status = HttpStatus.BAD_REQUEST
    response.status(400).json({
      statusCode: status,
      message: this.cleanUpException(exception)
    })
  }

  /**
   * Catches P2002 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
   *
   * @param exception P2002
   * @param response 409 Conflict
   */
  catchUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response
  ) {
    const status = HttpStatus.CONFLICT
    response.status(status).json({
      statusCode: status,
      message: this.cleanUpException(exception)
    })
  }

  /**
   * Catches P2025 error code
   * @param exception P2025
   * @param response 404 Not Found
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
   */
  catchNotFound(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response
  ) {
    const status = HttpStatus.NOT_FOUND
    response.status(status).json({
      statusCode: status,
      message: this.cleanUpException(exception)
    })
  }

  unhandleException(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost
  ) {
    super.catch(exception, host)
  }

  cleanUpException(exception: Prisma.PrismaClientKnownRequestError) {
    return exception.message.replace(/\n/g, '')
  }
}
