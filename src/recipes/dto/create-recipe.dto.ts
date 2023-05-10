import { IsObject, IsString } from 'class-validator';
import { CreateRecipeSupplyDto } from './recipe-supplies.dto';

export class CreateRecipeDto {
  @IsString()
  recipe_name: string;

  @IsString()
  recipe_description: string;

  @IsString()
  recipe_method: string;

  constructor(
    recipe_name: string,
    recipe_description: string,
    recipe_method: string,
  ) {
    this.recipe_name = recipe_name;
    this.recipe_description = recipe_description;
    this.recipe_method = recipe_method;
  }
}

export class CreateCompleteRecipeDto {
  @IsObject()
  recipes: CreateRecipeDto;
  @IsObject()
  recipe_supply: CreateRecipeSupplyDto;

  constructor(recipes: CreateRecipeDto, recipe_supply: CreateRecipeSupplyDto) {
    this.recipes = recipes;
    this.recipe_supply = recipe_supply;
  }
}
