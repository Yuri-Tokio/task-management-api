import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.registerAsync({ // o registerAsync serve para importar a configService já criada dinamicamente aqui
    global: true, // será acessivel em qlqr outro módulo da aplicação
    imports: [],  // não estamos passando nada
    useFactory: async (ConfigService: ConfigService) => ({
      secret: ConfigService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: +ConfigService.get<number>('JWT_EXPIRATION_TIME') } // o sinal de + transforma o retorno em numérico
    }),
    inject: [ConfigService],  // inject serve para o ConfigService ficar disponivel na useFactory
  }), UsersModule],   // importação dos módulos de usuários
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

// useFactory permite q importemos o configService no momento q estamos instanciando o módulo no JWT
