import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './users/userController';
import { AppService } from './app.service';
import { UserService } from './users/userService';
// import { CatsController } from './cats/cats.controller';
import { UsersModule } from './users/userModule';
import { CatsModule } from './cats/cats.module';
import { AnimalModule } from './animals/animals.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { App2Service } from './tst.service';

@Module({
  imports: [UsersModule /** AnimalModule.forAnimal('cat') */ /** CatsModule */],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // provide: APP_FILTER,
      // useClass: HttpExceptionFilter,
      // useValue: new HttpExceptionFilter(), 需要传入实例对象
      provide: 'CustomToken', //自定义token
      useClass: App2Service,
    },
  ],
  // exports: [AnimalModule],
  // 该模块可以再次导出,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'c*s', method: RequestMethod.ALL });
    consumer
      .apply(LoggerMiddleware, LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.ALL });
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    consumer
      .apply(logger)
      .exclude({ path: 'cats/aa', method: RequestMethod.GET }, 'cats/(.*)')
      .forRoutes(CatsController);
  }
}
