import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { from, Observable, throwError, of, TimeoutError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('login before.');
    let now = Date.now();

    let isCached = false;
    if (isCached) {
      // Stream重写；应用于缓存拦截器，不去执行handler
      return of([]);
    }

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
      .pipe(
        // n秒后，请求处理被取消，并返回超时错误
        timeout(1000),
        catchError(err => {
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      ) //异常拦截
      .pipe(
        //返回结果拦截
        map(data => {
          console.log(data);
          return { data };
        }),
      );
  }
}
