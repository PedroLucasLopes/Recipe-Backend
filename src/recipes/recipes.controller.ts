import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateCompleteRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('recipes')
@ApiTags('Recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiResponse({ status: 201, description: 'Recipe successfully created' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  create(@Body() createCompleteRecipeDto: CreateCompleteRecipeDto) {
    return this.recipesService.create(createCompleteRecipeDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all recipes' })
  @ApiResponse({ status: 200, description: 'All the recipes are found' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List One Recipe By Id' })
  @ApiResponse({ status: 200, description: 'Recipe successfully found' })
  @ApiResponse({ status: 400, description: 'No results for this search' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe information' })
  @ApiResponse({ status: 201, description: 'Recipe successfully updated' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a recipe' })
  @ApiResponse({ status: 200, description: 'Recipe successfully removed' })
  @ApiResponse({ status: 500, description: 'Internal System Error' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
