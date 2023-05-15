import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: process.env.CLIENT,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DATABASE,
          port: 5432,
          ssl: { rejectUnauthorized: true },
        },
        migrations: {
          directory: '/migrations',
          loadExtensions: ['.js'],
        },
      },
    }),
    RecipesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
