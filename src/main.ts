import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  let ins = express();
  const app = await NestFactory.create(AppModule); //TODO:查看create方法对module做了什么处理
  app.use(logger); // 全局中间件
  await app.listen(3000);
}
bootstrap();
