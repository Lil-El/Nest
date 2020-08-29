import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);
    console.log('拦截到异常了all');
  }
}
