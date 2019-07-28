import {History} from './History';
import {OrderDish} from './order.dish';

export class Orders {
  id: number;
  comments: String;
  historyList: History[];
  consist: OrderDish[];
}
