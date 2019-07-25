import {IngredientPart} from './IngredientPart';

export class Ingredient {
  id: number;
  name: string;
  measure: string;
  volumePerUnit: number;
  summaryAmount: number;
  summaryVolume: number;
  parts: IngredientPart[];
}

export interface IngredientApi {
  items: Ingredient[];
  totalCount: number;
}
