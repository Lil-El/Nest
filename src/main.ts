import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  let ins = express();
  const app = await NestFactory.create(AppModule); //TODO:查看create方法对module做了什么处理
  await app.listen(3000);
}
bootstrap();
