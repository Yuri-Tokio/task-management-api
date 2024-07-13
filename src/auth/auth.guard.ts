import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate { 

  private jwtSecret: string;

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async canActivate(  // por se tratar de uma promise, usaremos async
    context: ExecutionContext,
  ): Promise<boolean> { 

    const request = context.switchToHttp().getRequest();  // ter acesso as requisições do express

    const token = this.extractTokenFromHeader(request)

    if (!token){
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret:this.jwtSecret
        }
      )
      request['user'] = payload
    } catch{
      throw new UnauthorizedException()
    }

    return true // se retornar true é pq temos nosso usuário autenticado
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split('')??[];
    return type === 'Bearer' ? token : undefined;
    // estamos extraindo o token da requisição e verificando se o type é do tipo Bearer. Se for retorna token, do contrário retorna undefined
  }
}