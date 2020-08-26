import { Module, DynamicModule, Global } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { DogsService } from '../dog/dogs.service';
import { CatsController } from 'src/cats/cats.controller';

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
      exports: [CatsService],
    };
  }
}
