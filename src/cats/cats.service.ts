import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCat() {
    return '你获得一直小白猫';
  }
}
