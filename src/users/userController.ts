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
} from '@nestjs/common';

import { Request, Response, NextFunction, query } from 'express'; // 可以使用@types/express包

@Controller('users')
export class UserController {
  // Optional 表示可选; Inject依赖注入的配置
  // constructor(private readonly usersService:UsersService) 或 ：
  constructor(@Optional() @Inject('UserService') private userService) {}

  @Inject('CatsService')
  private readonly catsService;

  @Get('/')
  async getAllUser(@Res() res, @Query('age') query, next: NextFunction) {
    let a = await this.userService.getUser(query);
    let message = await this.catsService.getCat();
    res.status(HttpStatus.OK).json({ ...a, message });
  }

  @Get('/:id')
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
