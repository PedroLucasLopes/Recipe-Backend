import { IsObject, IsString } from 'class-validator';
import { CreateRecipeSupplyDto } from './recipe-supplies.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @IsString()
  @ApiProperty()
  recipe_name: string;

  @IsString()
  @ApiProperty()
  recipe_description: string;

  @IsString()
  @ApiProperty()
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
  @ApiProperty()
  recipes: CreateRecipeDto;
  @IsObject()
  @ApiProperty()
  recipe_supply: CreateRecipeSupplyDto;

  constructor(recipes: CreateRecipeDto, recipe_supply: CreateRecipeSupplyDto) {
    this.recipes = recipes;
    this.recipe_supply = recipe_supply;
  }
}
