import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  let ins = express();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
