import { PartialType } from '@nestjs/mapped-types';
import { CreateCompleteRecipeDto } from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(CreateCompleteRecipeDto) {}
