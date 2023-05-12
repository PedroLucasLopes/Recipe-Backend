import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.knex('user')
      .where(
        { user_username: createUserDto.user_username } || {
          user_email: createUserDto.user_email,
        },
      )
      .first();
    if (!exists) {
      try {
        const password = await encodePassword(createUserDto.user_password);
        const newUser = await this.knex('user')
          .insert({ ...createUserDto, user_password: password })
          .returning('*');
        return newUser;
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new HttpException('Este usuário já existe', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.knex.select('*').from('user');
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.knex
        .select('*')
        .from('user')
        .where({ id: id })
        .returning('*');

      if (one.length === 0) {
        try {
        } catch (err) {
          throw new HttpException(
            'Não existe nenhum usuário com esse id',
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        return one;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const byUser = await this.knex
        .select('*')
        .from('user')
        .where({ user_username: username })
        .returning('*');

      if (byUser.length === 0) {
        try {
        } catch (err) {
          throw new HttpException(
            'Não existe nenhum usuário com esse nome',
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        return byUser;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const update = await this.knex
        .table('user')
        .update(updateUserDto)
        .where({ id })
        .returning('*');
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      const del = await this.knex.table('user').where({ id }).delete();
      return del;
    } catch (err) {
      throw new Error(err);
    }
  }
}
