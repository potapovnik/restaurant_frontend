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

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAll().subscribe(resp => this.listOfAllOrders = resp);
  }

}
