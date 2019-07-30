import {History} from './History';
import {OrderDish} from './order.dish';

export class Orders {
  id: number;
  comments: string;
  historyList: History[];
  consist: OrderDish[];
}
