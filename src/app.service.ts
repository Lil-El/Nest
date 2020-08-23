import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  // Optional 可选 Inject注入的配置
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient1) {
    console.log(httpClient1);
  }

  @Inject('HTTP_OPTIONS')
  private readonly httpClient2;

  getHello(): string {
    return 'Hello World!';
  }
}
