import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './users/userController';
import { AppService } from './app.service';
import { UsersService } from './users/usersService';
// import { CatsService } from './cats/cats/cats.service';

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
