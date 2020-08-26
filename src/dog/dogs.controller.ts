import { Controller, Get, Inject } from '@nestjs/common';

@Controller('/cats')
export class DogsController {
  @Inject('DogService')
  private dogsService;

  @Get()
  getCat() {
    return this.dogsService.getDog();
  }
}
