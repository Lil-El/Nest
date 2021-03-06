import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Optional,
  Inject,
  Res,
  Param,
  Query,
  HttpException,
  Catch,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';

import { Request, Response, NextFunction, query } from 'express'; // 可以使用@types/express包
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

// @UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {
  // Optional 表示可选; Inject依赖注入的配置
  // private readonly usersService:UsersService 或 ：
  constructor(@Optional() @Inject('UsersService') private UsersService) {
    console.log('object');
    console.log(UsersService);
  }
  @Inject('CatsService')
  private catsService;
  // @Inject('DogsService')
  // private dogsService;

  @Get('/')
  async getAllUser(@Res() res, @Query('age') query, next: NextFunction) {
    let a = await this.catsService.getCat(query);
    res.status(HttpStatus.OK).json(a);
  }

  @Get('exp')
  getException() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new NotFoundException();
  }

  @Get('dog')
  public async getDog() {
    // return this.dogsService.getDog();
    return '1';
  }

  @Get(':id')
  public async getUserById(@Res() res, @Param('id') id) {
    //TODO:@Res 如何注入到res当中的
    if (id == 1) {
      const user = [{ id: 1, name: 'yxd' }];
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: '404' });
    }
  }

  /**
   *  @Session() - install express-session
      @Body() - install body-parser
   */
  @Post()
  addUser() {}
}
