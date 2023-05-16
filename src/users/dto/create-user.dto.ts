import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  user_email: string;

  @IsString()
  @ApiProperty()
  user_password: string;

  @IsString()
  @ApiProperty()
  user_username: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  user_city: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  user_country: string;

  constructor(
    user_email: string,
    user_password: string,
    user_username: string,
    user_city: string,
    user_country: string,
  ) {
    this.user_email = user_email;
    this.user_password = user_password;
    this.user_username = user_username;
    this.user_city = user_city;
    this.user_country = user_country;
  }
}
