import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],  // quando outro módulo importar o modulo de usuario, ele terá acesso ao userService
  providers: [UsersService]
})
export class UsersModule {}
