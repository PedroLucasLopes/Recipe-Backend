import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authenticate user login information' })
  @ApiResponse({ status: 201, description: 'Authenticated user' })
  @ApiResponse({ status: 401, description: 'Unauthorized Access' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  signIn(@Body() { username, password }: AuthDto) {
    return this.authService.signIn(username, password);
  }
}
