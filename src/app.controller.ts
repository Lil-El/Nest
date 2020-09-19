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
  Ip,
  Query,
  Body,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';

import { Request, Response, NextFunction, query } from 'express'; // 可以使用@types/express包
import { NotfoundException } from './exception/forbidden.exception';

@Controller('/')
export class AppController {
  // 依赖注入
  constructor(private readonly appService: AppService) {}

  @Inject('CatsService')
  private catsService;

  @Inject('CustomToken')
  private app2Service;

  @Get('user_*/:id/:age')
  @HttpCode(200)
  @Header('yxd_res', 'yxd')
  getHello(@Req() req, @Res() res, @Param('id') params): any {
    res.status(HttpStatus.OK).json([{ params }]);
  }

  @Get()
  helloG(): string {
    // return 'HI! no cat le ';
    // throw new NotfoundException();
    return (
      this.appService.getHello() +
      this.catsService.getCat() +
      this.app2Service.app2()
    );
  }

  @Post()
  helloP(@Res() res, @Ip() ip): string {
    return res.send('post hello' + ip);
  }

  /**
   *
   * @param res
   * @param query /3000?a=1
   * @param body x-www-form-urlencoded name:1
   */
  @Post('post')
  queryP(
    @Req() req,
    @Res() res,
    @Query() query,
    @Body('name') body,
    @Param() param,
  ): string {
    // console.log(query);
    console.log(body);
    // console.log(param);
    return res.send('post hello');
  }

  @Get('doc')
  @Redirect('http://www.baidu.com', 301)
  notFound(@Query('v') v) {
    // v==1 docs.nest.js
    // v!=1 baidu.com
    if (v == 1) return { url: 'https://docs.nestjs.com/v5/', statusCode: 301 };
    return '404';
  }
}
