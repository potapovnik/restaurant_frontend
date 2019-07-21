import {Component, OnInit} from '@angular/core';
import {CookService} from './cook.service';
import {CookOrders} from './cook.orders';

@Component({
  selector: 'app-cook-orders',
  templateUrl: './cook-orders.component.html',
  styleUrls: ['./cook-orders.component.scss']
})
export class CookOrdersComponent implements OnInit {
  listOfMyOrders: CookOrders[];
  newCookOrders: CookOrders;

  constructor(private cookService: CookService) {
  }

  ngOnInit() {
    this.getAllOrderOfCook();
  }

  getAllOrderOfCook() {
    this.cookService.allOrdersOfCook(3).subscribe(resp => this.listOfMyOrders = resp);
  }

  updateOrder(cookOrder: CookOrders) {
    this.cookService.updateOrder(cookOrder).subscribe();
  }

  isTake(cookOrder: CookOrders) {
    cookOrder.isTake = true;
    this.newCookOrders = new CookOrders();
    this.newCookOrders.id = cookOrder.id;
    this.newCookOrders.cook = cookOrder.cook;
    this.newCookOrders.isTake = true;
    this.updateOrder(this.newCookOrders);
  }
  isReady(cookOrder: CookOrders) {
    cookOrder.isReady = true;
    this.updateOrder(cookOrder);
  }
}
