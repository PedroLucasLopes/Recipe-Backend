import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/Local/local-auth.guard';
import { AuthService } from './auth/auth/auth.service';
import { JwtAuthGuard } from './auth/JWT/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth Validation Middleware')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Validate user login and generate a JWT access_token',
  })
  @ApiResponse({ status: 201, description: 'Authenticated user' })
  @ApiResponse({ status: 401, description: 'Unauthorized Access' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  @ApiOperation({
    summary: 'Get the user by the bearer token in JWT',
  })
  @ApiResponse({ status: 201, description: 'Return the user by his session' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  getHello(@Request() req): string {
    return req.user;
  }
}
