import { Injectable } from '@nestjs/common';
import { CreateCompleteRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  create(createCompleteRecipeDto: CreateCompleteRecipeDto) {
    return this.recipesRepository.create(createCompleteRecipeDto);
  }

  findAll() {
    return this.recipesRepository.findAll();
  }

  findOne(id: number) {
    return this.recipesRepository.findOne(id);
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipesRepository.update(id, updateRecipeDto);
  }

  remove(id: number) {
    return this.recipesRepository.remove(id);
  }
}
