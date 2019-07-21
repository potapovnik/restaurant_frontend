import {WaiterOrders} from '../waiter-orders/waiter.orders';
import {CookOrders} from '../cook-orders/cook.orders';

export class Orders {
  id: number;
  waiterOrders: WaiterOrders;
  cookOrders: CookOrders;
  comments: String;
}
