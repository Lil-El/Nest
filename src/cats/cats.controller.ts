import {
  Controller,
  Get,
  Inject,
  HttpException,
  HttpStatus,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ParseIntPipe,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import {
  ForbiddenException,
  NotfoundException,
} from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { JoiValidationPipe } from 'src/pipe/validate.pipe';
import { CreateCatDto } from 'src/DTO/create-cat.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { BaseExceptionFilter } from '@nestjs/core';
import { Roles } from 'src/decorator/role.decorator';
import { AllExceptionFilter } from 'src/exception/all-exception.filter';

@Controller('/cats')
// @UseFilters(AllExceptionFilter)
// @UseGuards(AuthGuard) // 传入class，启用依赖注入，通过框架进行实例化
export class CatsController {
  @Inject('CatsService')
  private catsService;

  @Get()
  getCat() {
    return this.catsService.getCat();
  }

  @Post()
  // @UsePipes(JoiValidationPipe) // 使用类或创建实例都可以
  postCat(@Body() createCatDto: CreateCatDto) {
    // 使用管道验证CreateCatDTO的属性
    return this.catsService.postCat(createCatDto);
  }

  @Get(':id')
  @Roles('admin')
  // 使用自定义的装饰器，避免直接使用setMetadata
  // @SetMetadata('role', ['admin']) //反射器，设置role角色，在guard当中判断该路由的role
  // @UsePipes(ParseIntPipe)
  getCatAA(@Param('id', new ParseIntPipe()) id) {
    // console.log(typeof id);
    return '您获得一只' + id + '猫';
  }

  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter） 尽量使用类，而不是实例，减少内存开销
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
    // throw new ForbiddenException();
    throw new NotfoundException();
    return '您获得所有的猫';
  }
}
