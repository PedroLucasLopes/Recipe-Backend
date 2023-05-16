import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'User already exists!' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users successfully found' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List one user by Id' })
  @ApiResponse({ status: 200, description: 'User successfully found' })
  @ApiResponse({ status: 400, description: 'No data for this user' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('username/:user_username')
  @ApiOperation({ summary: 'List a user by the username' })
  @ApiResponse({ status: 200, description: 'User successfully found' })
  @ApiResponse({ status: 400, description: 'The username doesnt exist' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  findOneByUsername(@Param('user_username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user information' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user account' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
