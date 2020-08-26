import { Module } from '@nestjs/common';
import { UserController } from './userController';
import { UserService } from './userService';
import { CatsModule } from '../cats/cats.module';

@Module({
  // imports: [CatsModule],
  controllers: [UserController],
  providers: [UserService],
  // exports: [CatsModule],
})
export class UsersModule {}
