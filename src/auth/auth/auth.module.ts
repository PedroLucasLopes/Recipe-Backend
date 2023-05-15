import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../Local/local.strategy';
import { UsersRepository } from 'src/users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from '../JWT/jwt.strategy';

dotenv.config();
@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UsersRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
