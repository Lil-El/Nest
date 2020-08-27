import { Injectable, NestMiddleware } from '@nestjs/common';
import { request, response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('request ...');
    next();
  }
}
//没有依赖关系时，可以使用函数式中间件
export function logger(req, res, next) {
  console.log('函数式中间件');
  next();
}
