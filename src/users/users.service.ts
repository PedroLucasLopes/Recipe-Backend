import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const password = await encodePassword(createUserDto.user_password);
    const newUser = await this.knex('user')
      .insert({ ...createUserDto, user_password: password })
      .returning('*');

    // const exists = this.knex('user')
    //   .where(
    //     { user_username: createUserDto.user_username } || {
    //       user_email: createUserDto.user_email,
    //     },
    //   )
    //   .first();

    // if (!!exists) {
    //   return { error: 'Usuário já existe!' };
    // } else {

    // }

    return newUser;
  }

  async findAll() {
    return await this.knex.select('*').from('user');
  }

  async findOne(id: number) {
    try {
      const one = await this.knex
        .select('*')
        .from('user')
        .where({ id: id })
        .returning('*');

      return one;
    } catch (err) {
      console.log(err);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const byUser = await this.knex
        .select('*')
        .from('user')
        .where({ user_username: username })
        .returning('*');

      return byUser;
    } catch (err) {}
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const update = await this.knex
        .table('user')
        .update(updateUserDto)
        .where({ id })
        .returning('*');
      return update;
    } catch (err) {}
  }

  async remove(id: number) {
    try {
      const del = await this.knex.table('user').where({ id }).delete();
      return del;
    } catch (err) {}
  }
}
