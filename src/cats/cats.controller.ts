import { Controller, Get, Inject } from '@nestjs/common';

@Controller('/cats')
export class CatsController {
  @Inject('CatsService')
  private catsService;

  @Get()
  getCat() {
    return this.catsService.getCat();
  }
}
