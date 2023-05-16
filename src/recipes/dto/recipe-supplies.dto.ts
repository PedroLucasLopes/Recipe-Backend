import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRecipeSupplyDto {
  @IsString()
  @ApiProperty()
  recipe_supplies: string;

  @IsNumber()
  @ApiProperty()
  id_recipes: number;

  constructor(recipe_supplies: string, id_recipes: number) {
    this.recipe_supplies = recipe_supplies;
    this.id_recipes = id_recipes;
  }
}
