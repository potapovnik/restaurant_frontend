import {Dish} from './Dish';

export class OrderDish {
  id: OrderDishId;
  count: number;
  dish: Dish;
}

export class OrderDishId {
  dishId: number;
  orderId: number;
}
