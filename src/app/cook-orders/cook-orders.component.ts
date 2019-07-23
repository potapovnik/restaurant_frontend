import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users/users.service';
import {Orders} from '../utils/orders';
import {OrdersService} from '../utils/orders.service';
import {HistoryService} from '../utils/history.service';
import {History} from '../utils/History';

@Component({
  selector: 'app-cook-orders',
  templateUrl: './cook-orders.component.html',
  styleUrls: ['./cook-orders.component.scss']
})
export class CookOrdersComponent implements OnInit {
  listOfMyOrders: Orders[];
  newHistory: History;

  constructor(private userService: UsersService, private orderService: OrdersService, private  historyService: HistoryService) {
  }

  ngOnInit() {
    this.getAllOrderOfCook();

  }

  getAllOrderOfCook() {
    this.orderService.getAllById(3).subscribe(resp => this.listOfMyOrders = resp);
  }

  updateOrder(order: Orders, status: number) {
    this.newHistory  = new History();
    this.newHistory.user_id = 2; // Изменить на текущий!
    this.newHistory.order_id = order.id;
    this.newHistory.status_id = status;
    this.historyService.nextStatus(this.newHistory).subscribe();
  }


  isTake(order: Orders) {
    this.updateOrder(order, 3);
  }

  isReady(order: Orders) {
    this.updateOrder(order, 4);
  }

}
