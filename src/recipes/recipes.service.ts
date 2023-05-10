import { Injectable } from '@nestjs/common';
import { CreateCompleteRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class RecipesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createCompleteRecipeDto: CreateCompleteRecipeDto) {
    const { recipe_supply, recipes } = createCompleteRecipeDto;
    const trx = await this.knex.transaction();

    try {
      const Recipes = await trx.table('recipes').insert(recipes).returning('*');
      const recipeSupplyData = { ...recipe_supply, id_recipes: Recipes[0].id };
      const RecipeSupply = await trx
        .table('recipe_supply')
        .insert(recipeSupplyData)
        .returning('*');

      await trx.commit();

      return { recipes: Recipes[0], recipe_supply: RecipeSupply[0] };
    } catch (err) {
      console.log(err);
      trx.rollback();
    }
  }

  async findAll() {
    const all = await this.knex
      .select('rc.*', 'rs.recipe_supplies')
      .from('recipes as rc')
      .leftJoin('recipe_supply as rs', 'rs.id_recipes', 'rc.id');
    return all;
  }

  async findOne(id: number) {
    const one = await this.knex
      .select('rc.*', 'rs.recipe_supplies')
      .from('recipes as rc')
      .where({ 'rc.id': id })
      .leftJoin('recipe_supply as rs', 'rs.id_recipes', 'rc.id');
    return one;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const { recipe_supply, recipes } = updateRecipeDto;
    const trx = await this.knex.transaction();

    try {
      const Recipes = await trx
        .table('recipes')
        .update(recipes)
        .where({ id })
        .returning('*');

      const RecipeSupply = await trx
        .table('recipe_supply')
        .update(recipe_supply)
        .where({ id_recipe: id })
        .returning('*');

      await trx.commit();

      return { recipes: Recipes[0], recipe_supply: RecipeSupply[0] };
    } catch (err) {
      console.log(err);
      trx.rollback();
    }
  }

  async remove(id: number) {
    const remove = await this.knex('recipes').where({ id }).delete();
    return remove;
  }
}
