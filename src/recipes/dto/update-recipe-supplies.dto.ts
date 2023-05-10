import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeSupplyDto } from './recipe-supplies.dto';

export class UpdateRecipeSupplyDto extends PartialType(CreateRecipeSupplyDto) {}
