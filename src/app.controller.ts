import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/Local/local-auth.guard';
import { AuthService } from './auth/auth/auth.service';
import { JwtAuthGuard } from './auth/JWT/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
