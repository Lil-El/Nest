import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { AllExceptionFilter } from './exception/all-exception.filter';
import { JoiValidationPipe } from './pipe/validate.pipe';
import { AuthGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //TODO:查看create方法对module做了什么处理
  let { httpAdapter } = app.get(HttpAdapterHost);
  app.use(logger); // 全局中间件

  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器
  // app.useGlobalPipes(new JoiValidationPipe()); // 全局管道
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter)); // 继承自基础类的全局过滤器
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
