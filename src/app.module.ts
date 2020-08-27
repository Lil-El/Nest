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

@Module({
  imports: [UsersModule, AnimalModule.forAnimal('cat') /** CatsModule */],
  controllers: [AppController],
  providers: [AppService],
  // exports: [AnimalModule], 该模块可以再次导出
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
