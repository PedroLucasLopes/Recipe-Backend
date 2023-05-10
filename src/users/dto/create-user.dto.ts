import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_email: string;

  @IsString()
  user_password: string;

  @IsString()
  user_username: string;

  @IsOptional()
  @IsString()
  user_city: string;

  @IsOptional()
  @IsString()
  user_country: string;
}
