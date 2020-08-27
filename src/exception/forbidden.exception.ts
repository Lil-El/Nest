import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('notFound', HttpStatus.NOT_FOUND);
  }
}
export class NotfoundException extends NotFoundException {
  constructor() {
    super('你的猫', '没找到ya');
  }
}
