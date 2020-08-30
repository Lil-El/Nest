import {
  Module,
  Global,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { APP_PIPE } from '@nestjs/core';
import { JoiValidationPipe } from 'src/pipe/validate.pipe';

@Global()
@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // 为模块设置管道
    {
      provide: APP_PIPE,
      useClass: JoiValidationPipe,
    },
  ],
  exports: [CatsService],
})
export class CatsModule /**implements NestModule */ {
  // module类也可以依赖注入；实现配置等目的
  constructor(private readonly catsService: CatsService) {
    console.log(this.catsService);
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('cats');
  // }
}
