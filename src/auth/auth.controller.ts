import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() { name, pass }: { name: string; pass: string }) {
    return this.authService.signIn(name, pass);
  }
}
