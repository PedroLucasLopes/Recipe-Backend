import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
