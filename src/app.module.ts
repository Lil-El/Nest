import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controller/userController';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
