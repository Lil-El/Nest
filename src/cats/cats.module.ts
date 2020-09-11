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
import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { JoiValidationPipe } from 'src/pipe/validate.pipe';
import { AuthGuard } from 'src/guard/auth.guard';
import { AllExceptionFilter } from 'src/exception/all-exception.filter';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { DogsModule } from 'src/dog/dogs.module';
import { DogsService } from 'src/dog/dogs.service';

// @Global()
@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // 为模块设置管道
    // {
    //   provide: APP_PIPE,
    //   useClass: JoiValidationPipe,
    // },
    {
      // 提升到全局，user 、app也会被守卫
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      // 提升到全局，user 、app的错误也能捕获到
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
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
