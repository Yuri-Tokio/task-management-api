import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    sigIn(
        @Body('username') username : string,
        @Body('password') password: string
    ): AuthResponseDto {    // Diz que o retorno do método sigIn é do tipo AuthResponseDto q será criado baseado no auth.dto.ts
        return this.AuthService.sigIn(username, password)
    }
}