import {
  Controller,
  Get,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import {
  ForbiddenException,
  NotfoundException,
} from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('/cats')
export class CatsController {
  @Inject('CatsService')
  private catsService;

  @Get()
  getCat() {
    return this.catsService.getCat();
  }

  @Get('aa')
  getCatAA() {
    return '您获得一只AA猫';
  }

  @UseFilters(new HttpExceptionFilter())
  @Get('all')
  getCatAll() {
    // 1.抛出异常
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new NotFoundException('你的猫', '没找到');
    // 2. 定义错误内容
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'Error...',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    // 3. 自定义异常
    throw new ForbiddenException();
    // throw new NotfoundException();
    return '您获得所有的猫';
  }
}
