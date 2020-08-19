import { Controller, Get, Post, HttpStatus, Res, Param } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express'; // 可以使用@types/express包

@Controller('users')
export class UserController {
  // @Get()
  // getAllUser(req: Request, res: Response, next: NextFunction) {
  //   // res.status(HttpStatus.OK).json([
  //   return [{ id: 1, name: 'yxd' }];
  //   //   {
  //   //     id: 1,
  //   //     name: 'yxd',
  //   //   },
  //   // ]);
  // }

  @Get('/:id')
  public async getUserById(@Res() res, @Param('id') id) {
    //TODO:@Res 如何注入到res当中的
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
