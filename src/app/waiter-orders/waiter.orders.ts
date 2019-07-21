import {Users} from '../users/users';

export class WaiterOrders {
  id: number;
  timeOfTake: Date;
  timeOfGiven: Date;
  isReady: Boolean;
  isTake: Boolean;
  waiter: number;
}
