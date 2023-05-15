import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.signIn(username, password);
  }
}
