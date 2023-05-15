import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateCompleteRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async create(
    createCompleteRecipeDto: CreateCompleteRecipeDto,
  ): Promise<any> {
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
      trx.rollback();
      throw new Error(err);
    }
  }

  public async findAll(): Promise<any> {
    try {
      const all = await this.knex
        .select('rc.*', 'rs.recipe_supplies')
        .from('recipes as rc')
        .leftJoin('recipe_supply as rs', 'rs.id_recipes', 'rc.id');
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number): Promise<any> {
    const one = await this.knex
      .select('rc.*', 'rs.recipe_supplies')
      .from('recipes as rc')
      .where({ 'rc.id': id })
      .leftJoin('recipe_supply as rs', 'rs.id_recipes', 'rc.id');
    if (one.length > 0) {
      try {
        return one;
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new HttpException(
        'Não encontramos resultados para essa receita!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<any> {
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
      trx.rollback();
      throw new Error(err);
    }
  }

  public async remove(id: number): Promise<any> {
    try {
      const remove = await this.knex('recipes').where({ id }).delete();
      return { user: remove, message: 'Receita deletada com sucesso!' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
