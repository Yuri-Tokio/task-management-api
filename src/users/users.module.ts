import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';


@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],  // entidade de usuário ficará disponível pra ser usado no typeOrm no módulo de usuário
  exports: [UsersService],
  providers: [UsersService]
})


export class UsersModule {}
