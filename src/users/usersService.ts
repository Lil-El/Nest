import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(age) {
    return { name: 'ywd', age };
  }
}
