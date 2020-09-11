import { Module, DynamicModule, Global } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { DogsService } from '../dog/dogs.service';
import { CatsController } from 'src/cats/cats.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({})
export class AnimalModule {
  static forAnimal(options): DynamicModule {
    // const providers = createProvider(options);
    const providers = [];
    if (options === 'cat') {
      providers.push(CatsService);
    } else {
      providers.push(DogsService);
    }
    return {
      global: true,
      module: AnimalModule,
      controllers: [CatsController],
      providers: [CatsService],
      exports: [CatsService], // 不导出的话，app和user无法使用CatsService
    };
  }
}
