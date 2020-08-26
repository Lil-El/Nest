import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './users/userController';
import { AppService } from './app.service';
import { UserService } from './users/userService';
// import { CatsController } from './cats/cats.controller';
import { UsersModule } from './users/userModule';
import { CatsModule } from './cats/cats.module';
import { AnimalModule } from './animals/animals.module';

@Module({
  imports: [UsersModule, AnimalModule.forAnimal('cat') /** CatsModule */],
  controllers: [AppController],
  providers: [AppService],
  // exports: [AnimalModule], 该模块可以再次导出
})
export class AppModule {}
