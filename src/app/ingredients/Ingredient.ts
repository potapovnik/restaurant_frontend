import {IngredientPart} from './IngredientPart';

export class Ingredient {
  id: number;
  name: string;
  measure: string;
  parts: IngredientPart[];
}
