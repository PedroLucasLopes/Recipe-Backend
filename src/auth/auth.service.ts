import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signIn(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersRepository.findOneByUsername(username);
      const { user_password, ...result } = user[0];
      const hashCompare = await bcrypt.compare(password, user_password);

      if (!hashCompare || result.user_username !== username) {
        const error = new UnauthorizedException().getResponse();
        return {
          message: `Seu usuário ou senha estão errados`,
          error: error,
        };
      } else {
        return { message: 'Sucesso! Dados corretos!', user: result };
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
