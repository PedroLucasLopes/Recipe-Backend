import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipesReposity } from './recipes.repository';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipesReposity],
  exports: [RecipesReposity],
})
export class RecipesModule {}
