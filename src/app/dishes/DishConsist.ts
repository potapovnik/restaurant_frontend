import {Ingredient} from '../ingredients/Ingredient';

export class DishConsist {
  id: EmbeddedId;
  value: number;
  ingredient: Ingredient;
}

export class EmbeddedId {
  dishId: number;
  ingredientId: number;
}
