import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(age) {
    return { name: 'ywd', age };
  }
}
