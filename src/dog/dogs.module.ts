import { Module, Global } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Global()
@Module({
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {
  // module类也可以依赖注入；实现配置等目的
  constructor(private readonly dogsService: DogsService) {
    console.log(this.dogsService);
  }
}
