import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { of } from 'rxjs'
import type { Observable } from 'rxjs'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true
    if (isCached) {
      return of([])
    }
    return next.handle()
  }
}
