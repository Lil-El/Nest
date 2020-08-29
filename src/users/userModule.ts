import { Module } from '@nestjs/common';
import { UserController } from './userController';
import { UserService } from './userService';
import { CatsModule } from '../cats/cats.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Module({
  // imports: [CatsModule],
  controllers: [UserController],
  providers: [
    UserService,
    // 捕获module下的异常
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  // exports: [CatsModule],
})
export class UsersModule {}
