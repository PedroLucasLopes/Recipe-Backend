import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

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
        return result;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(user: any) {
    const payload = { name: user.user_username, id: user.id };

    if (payload.name === undefined || payload.id === undefined) {
      throw new UnauthorizedException();
    } else {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
