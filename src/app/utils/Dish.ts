import {DishConsist} from './DishConsist';
import {Ingredient} from './Ingredient';

export class Dish {
  id: number;
  name: string;
  ismenu: boolean;
  cost: number;
  type: string;
  consist: DishConsist[];
}

export class DishForDb {
  name: string;
  ismenu: boolean;
  cost: number;
  type: string;
  consist: DishConsist[];
}

export interface DishApi {
  items: Dish[];
  totalCount: number;
}
