import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users/users.service';
import {Users} from '../users/users';
import {OrdersService} from '../utils/orders.service';
import {Dish} from '../dishes/Dish';
import {DishService} from '../dishes/dish.service';
import {OrderDish} from '../utils/order.dish';
import {Orders} from '../utils/orders';
import {DishView} from '../utils/dishView';
import {HistoryService} from '../utils/history.service';
import {History} from '../utils/History';

@Component({
  selector: 'app-waiter-orders',
  templateUrl: './waiter-orders.component.html',
  styleUrls: ['./waiter-orders.component.scss']
})
export class WaiterOrdersComponent implements OnInit {
  newOrder: Orders;
  cookList: Users[];
  dishList: Dish[];
  selectedDish: Dish;
  nameCountDishList: DishView[];
  countOfDishInOrder: number;
  myOrders: Orders[];
  choosedCook: Users;
  orderDishList: OrderDish[];
  createdOrder: Orders;
  newHistory: History;

  constructor(private userService: UsersService, private orderService: OrdersService
    , private dishService: DishService, private historyService: HistoryService) {

  }

  ngOnInit() {
    this.userService.getAllCook().subscribe(resp => this.cookList = resp);
    this.dishService.getAllDishes().subscribe(resp => this.dishList = resp);
    this.newOrder = new Orders();
    this.selectedDish = new Dish();
    this.choosedCook = new Users();
    this.orderDishList = [];
    this.nameCountDishList = [];
  }

  onSelectedDish(selectedDish: Dish) {
    this.selectedDish = selectedDish;
  }


  addToOrderDish(dish: Dish) {
    this.orderDishList.push(new OrderDish());
    this.nameCountDishList.push(new DishView());
    for (let i = 0; i < this.orderDishList.length; i++) {
      if (this.orderDishList[i].dish_id === undefined) {
        this.orderDishList[i].dish_id = dish.id;
        this.orderDishList[i].count = this.countOfDishInOrder;
      }
      if (this.nameCountDishList[i].name === undefined) {
        this.nameCountDishList[i].name = dish.name;
        this.nameCountDishList[i].count = this.countOfDishInOrder;
      }
    }
  }

  chooseCook(cook: Users) {
    this.choosedCook = cook;

  }

  getAllMyOrders(id: number) {
    this.orderService.getAllById(id).subscribe(resp => this.myOrders = resp);
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(resp => this.createdOrder = resp);
    this.newHistory = new History();
    this.newHistory.order_id = this.createdOrder.id;
    this.newHistory.status_id = 1;
    this.newHistory.user_id = 1; // Изменить на текующий!
    this.historyService.nextStatus(this.newHistory).subscribe();
  }
}
