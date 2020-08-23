import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controller/userController';
import { AppService } from './app.service';
import { CatsService } from './cats/cats/cats.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, CatsService],
})
export class AppModule {}
