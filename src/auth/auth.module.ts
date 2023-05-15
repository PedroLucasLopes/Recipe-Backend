import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy, UsersRepository],
  exports: [AuthService],
})
export class AuthModule {}
