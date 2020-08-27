import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
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
