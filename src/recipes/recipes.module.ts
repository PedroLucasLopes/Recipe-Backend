import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { RecipesRepository } from './recipes.repository';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipesRepository],
  exports: [RecipesRepository],
})
export class RecipesModule {}
