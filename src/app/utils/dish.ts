import {DishConsist} from './DishConsist';

export class Dish {
  id: number;
  name: string;
  ismenu: boolean;
  cost: number;
  type: string;
  consist: DishConsist[];
  maxCount: number;
}

// export class DishForDb {
//   name: string;
//   ismenu: boolean;
//   cost: number;
//   type: string;
//   consist: DishConsist[];
// }

export interface DishApi {
  items: Dish[];
  totalCount: number;
}
