import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly UsersService: UsersService, // pra buscar o usuario em memoria
        private readonly jwtService: JwtService,
        private readonly ConfigService: ConfigService // usado para retornar o tempo de expiração
    ) {
        this.jwtExpirationTimeInSeconds = +this.ConfigService.get<number>('JWT_EXPIRATION_TIME');
    }

    async sigIn(username: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.UsersService.findByUserName(username)

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) { // vai receber a senha e comparar com a do usuário
            throw new UnauthorizedException()
        }

        // Criação do payload para injetar no token do jwt
        // o payload possui os dados q estamos passando e os dados da nossa autenticação

        const payload = { sub: foundUser.id, username: foundUser.username}  // recomendado pelo jwt usar id como 'sub'

        const token = this.jwtService.sign(payload)

        return { token, expiresIn: this.jwtExpirationTimeInSeconds }
    }
}
