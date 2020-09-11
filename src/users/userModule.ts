import { Module } from '@nestjs/common';
import { UserController } from './userController';
import { UserService } from './userService';
import { CatsModule } from '../cats/cats.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { DogsService } from 'src/dog/dogs.service';
import { AllExceptionFilter } from 'src/exception/all-exception.filter';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
  imports: [CatsModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      // 依赖注入
      provide: DogsService,
      useClass: DogsService,
    },
  ],
  exports: [CatsModule],
})
export class UsersModule {}
