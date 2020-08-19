import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Res,
  Param,
  HttpCode,
  Header,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

import { Request, Response, NextFunction } from 'express'; // 可以使用@types/express包

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user_*/:id/:age')
  @HttpCode(200)
  @Header('yxd_res', 'yxd')
  getHello(@Req() req, @Res() res, @Param('id') params): any {
    res.status(HttpStatus.OK).json([{ params }]);
  }

  @Get('404')
  @Redirect('http://www.baidu.com', 301)
  test(): string {
    return this.appService.getHello();
  }

  // @Get()
  // getAllUser(req: Request, res: Response, next: NextFunction) {
  //   res.status(HttpStatus.OK).json([
  //     {
  //       id: 1,
  //       name: 'yxd',
  //     },
  //   ]);
  // }

  @Get('/:id')
  public async getUserById(@Res() res, @Param('id') id) {
    if (id === 1) {
      const user = [{ id: 1, name: 'yxd' }];
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
    // const user = await this.userService.getUser(id);
  }
  /**
   *  @Session() - install express-session
      @Body() - install body-parser
   */
  @Post()
  addUser() {}
}
