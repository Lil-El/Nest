import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AllExceptionFilter } from 'src/exception/all-exception.filter';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles =
      (this.reflector &&
        this.reflector.get<string[]>('role', context.getHandler())) ||
      [];

    // 由守卫引发的任何异常都将由异常层(全局异常过滤器和应用于当前上下文的任何异常过滤器)处理。
    /**
     * 返回 false 的守卫会抛出一个 HttpException 异常。如果您想要向最终用户返回不同的错误响应，你应该抛出一个异常。
     */
    console.log('guard');
    if (request.path == '/cats/1') {
      if (request.query.role == roles[0]) {
        return true;
      } else {
        console.log('error');
        throw new HttpException('not', 400);
      }
    } else {
      if (request.query.name === 'bad') {
        return false;
      }
      return true;
    }
  }
}
