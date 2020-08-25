import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './users/userController';
import { AppService } from './app.service';
import { UserService } from './users/userService';
// import { CatsController } from './cats/cats.controller';
import { UsersModule } from './users/userModule';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
