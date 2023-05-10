import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(name);
    const { user_password, ...result } = user[0];
    const hashCompare = await bcrypt.compare(pass, user_password);

    if (!hashCompare || result.user_username !== name) {
      const error = new UnauthorizedException().getResponse();
      return {
        message: `Seu usuário ou senha estão errados`,
        error: error,
      };
    }

    return { message: 'Sucesso! Dados corretos!', user: result };
  }
}
