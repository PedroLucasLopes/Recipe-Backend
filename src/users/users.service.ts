import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        return { user: newUser, message: 'Usuário criado com sucesso!' };
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
    const one = await this.knex('user')
      .select('*')
      .where({ id: id })
      .returning('*');

    if (one.length > 0) {
      try {
        return one;
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new HttpException(
        'Não encontramos resultados para esse usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneByUsername(username: string) {
    const byUser = await this.knex('user')
      .select('*')
      .where({ user_username: username })
      .returning('*');

    if (byUser.length > 0) {
      try {
        return byUser;
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new HttpException(
        'Não existe nenhum usuário com esse nome!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.user_password) {
      try {
        const password = await encodePassword(updateUserDto.user_password);
        const updatePassword = await this.knex('user')
          .update({ user_password: password })
          .where({ id })
          .returning('*');
        return updatePassword;
      } catch (err) {
        throw new Error(err);
      }
    } else {
      try {
        const update = await this.knex('user')
          .update(updateUserDto)
          .where({ id })
          .returning('*');
        return { user: update, message: 'Dados atualizados com sucesso!' };
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  async remove(id: number) {
    try {
      const del = await this.knex.table('user').where({ id }).delete();
      return { user: del, message: 'Usuário deletado com sucesso!' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
