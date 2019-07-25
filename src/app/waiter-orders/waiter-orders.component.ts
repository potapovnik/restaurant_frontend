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
  isChosed: Boolean;
  choosedOrder: Orders;
  selectedOrder: Orders;
  isTakeCook: String;
  isTakeWaiter: String;
  isGivenCook: String;
  isGivenWaiter: String;

  constructor(private userService: UsersService, private orderService: OrdersService
    , private dishService: DishService, private historyService: HistoryService) {

  }

  ngOnInit() {
    this.isChosed = false;
    this.userService.getAllCook().subscribe(resp => this.cookList = resp);
    this.dishService.getMenuDishes().subscribe(resp => this.dishList = resp);
    this.orderService.getAllById(2).subscribe(resp => this.myOrders = resp); // Заменить на текущего!
    this.newOrder = new Orders();
    this.selectedDish = new Dish();
    this.choosedCook = new Users();
    this.createdOrder = new Orders();
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
    console.log(this.createdOrder);
    this.newHistory.order_id = this.createdOrder.id;
    this.newHistory.status_id = 1;
    this.newHistory.user_id = 1; // Изменить на текующий!
    this.historyService.nextStatus(this.newHistory).subscribe();
  }

  givenOrder(order: Orders) {
    this.newHistory = new History();
    this.newHistory.order_id = order.id;
    this.newHistory.status_id = 5;
    this.newHistory.user_id = 2; // Изменить на текующий!
    this.historyService.nextStatus(this.newHistory).subscribe();
  }

  selectMyOrder(order: Orders) {
    this.selectedOrder = order;
    this.isChosed = true;
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
