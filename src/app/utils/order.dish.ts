import {Dish} from './dish';

export class OrderDish {
  id: OrderDishId;
  count: number;
  dish: Dish;
}

export class OrderDishId {
  dishId: number;
  orderId: number;
}
