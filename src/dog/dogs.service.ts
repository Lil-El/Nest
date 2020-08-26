import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  getDog() {
    return '你获得一直小狗';
  }
}
