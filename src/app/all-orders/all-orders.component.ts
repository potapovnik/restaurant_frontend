import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../utils/orders.service';
import {Orders} from '../utils/orders';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  listOfAllOrders: Orders[];
  isTakeCook: String;
  isTakeWaiter: String;
  isGivenCook: String;
  isGivenWaiter: String;
  selectedOrder: Orders;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.getAllOrders();
    this.selectedOrder = new Orders();
  }

  getAllOrders() {
    this.ordersService.getAll().subscribe(resp => this.listOfAllOrders = resp);
  }
  selectMyOrder(order: Orders) {
    this.selectedOrder = order;
    for (const hist of order.historyList) {
      switch (hist.status_id) {
        case 1: {
          this.isTakeWaiter = 'Да';
          break;
        }
        case 3: {
          this.isTakeCook = 'Да';
          break;
        }
        case 4: {
          this.isGivenCook = 'Да';
          break;
        }
        case 5: {
          this.isGivenWaiter = 'Да';
          break;
        }
      }
    }
    this.checkIsStatus();
  }

  checkIsStatus() {
    if (this.isTakeCook !== 'Да') {
      this.isTakeCook = 'нет';
    }
    if (this.isTakeWaiter !== 'Да') {
      this.isTakeWaiter = 'нет';
    }
    if (this.isGivenCook !== 'Да') {
      this.isGivenCook = 'нет';
    }
    if (this.isGivenWaiter !== 'Да') {
      this.isGivenWaiter = 'нет';
    }
  }


}
