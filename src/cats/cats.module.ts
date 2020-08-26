import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  // module类也可以依赖注入；实现配置等目的
  constructor(private readonly catsService: CatsService) {
    console.log(this.catsService);
  }
}
