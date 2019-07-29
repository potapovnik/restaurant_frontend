import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users/users.service';
import {Users} from '../users/users';
import {OrdersService} from '../utils/orders.service';
import {DishService} from '../dishes/dish.service';
import {OrderDish} from '../utils/order.dish';
import {Orders} from '../utils/orders';
import {DishView} from '../utils/dishView';
import {HistoryService} from '../utils/history.service';
import {History} from '../utils/History';
import {Dish} from '../utils/Dish';
import {IngredientService} from '../ingredients/ingredient.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersForHistory} from '../utils/ordersForHistory';

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
  reservedIngredients: number[] = [];
  _dishCountForm: FormGroup;

  constructor(private userService: UsersService, private orderService: OrdersService
    , private dishService: DishService, private historyService: HistoryService, private ingredientService: IngredientService,
              private fb: FormBuilder) {
    this._dishCountForm = fb.group({
      count: fb.control(0, [Validators.required])
    });
  }

  ngOnInit() {
    this.isChosed = false;
    this.userService.getAllCook().subscribe(resp => this.cookList = resp);
    this.dishService.getMenuDishes().subscribe(resp => this.dishList = resp);
    this.orderService.getAllById(2).subscribe(resp => this.myOrders = resp); // Заменить на текущего!
    this.newOrder = new Orders();
    this.newOrder.consist = [];
    this.selectedDish = new Dish();
    this.choosedCook = new Users();
    this.createdOrder = new Orders();
    this.orderDishList = [];
    this.nameCountDishList = [];
  }

  onSelectedDish(selectedDish: Dish) {
    this.selectedDish = selectedDish;
    this.changeFormValidator(selectedDish);
  }

  // возвращает количество блюд, которое теперь нельзя сделать из-за зарезервированных ингредиентов
  usedIngredientsInCurrentOrder(dish: Dish): number {
    let tempIngredients = [];
    for (let i = 0; i < dish.consist.length; i++) {
      tempIngredients[i] = Math.ceil(this.reservedIngredients[dish.consist[i].ingredient.id] === undefined ? 0 : this.reservedIngredients[dish.consist[i].ingredient.id] / dish.consist[i].value);
    }
    let result = Math.max(...tempIngredients);
    if (result > dish.maxCount) {
      result = dish.maxCount;
    }
    return result;
  }

  cancelOrder() {
    this.orderDishList = [];
    this.reservedIngredients = [];
    this.newOrder = new Orders();
    this.newOrder.consist = [];
    this.nameCountDishList = [];
  }

  changeFormValidator(dish: Dish) {
    this._dishCountForm.reset();
    this._dishCountForm.controls['count'].clearValidators();
    this._dishCountForm.controls['count'].setValidators(
      [Validators.required, Validators.min(1), Validators.max(dish.maxCount - this.usedIngredientsInCurrentOrder(dish))]);
  }

  // добавляет deltaCount блюд к заказу
  addToOrderDish(dishAdd: Dish, deltaCount: any) {
    deltaCount = parseInt(deltaCount, 10);
    // ищем добавляли ли уже такое блюдо
    for (let i = 0; i < this.newOrder.consist.length; i++) {
      if (this.newOrder.consist[i].dish.id === dishAdd.id) {
        // нашли такое блюдо, значит изменяем количество блюд на новое
        // сбрасываем старое прежнее зарезервированное количество ингредиентов
        for (let j = 0; j < dishAdd.consist.length; j++) {
          this.reservedIngredients[dishAdd.consist[j].ingredient.id] -= dishAdd.consist[j].value * this.newOrder.consist[i].count;
        }
        this.newOrder.consist[i].count += deltaCount;
        // резервируем ингредиенты по новому количеству блюд
        for (let j = 0; j < dishAdd.consist.length; j++) {
          this.reservedIngredients[dishAdd.consist[j].ingredient.id] += dishAdd.consist[j].value * this.newOrder.consist[i].count;
        }
        this.changeFormValidator(dishAdd);
        return;
      }
    }
    // знаем что таких блюд не было
    this.newOrder.consist.push({id: {dishId: dishAdd.id, orderId: null}, dish: dishAdd, count: deltaCount});
    // резервируем ингредиенты по количеству блюд
    for (let j = 0; j < dishAdd.consist.length; j++) {
      this.reservedIngredients[dishAdd.consist[j].ingredient.id] =
        this.reservedIngredients[dishAdd.consist[j].ingredient.id] === undefined ?
          dishAdd.consist[j].value * deltaCount :
          this.reservedIngredients[dishAdd.consist[j].ingredient.id] + dishAdd.consist[j].value * deltaCount;
    }
    this.changeFormValidator(dishAdd);
    // this.orderDishList.push(new OrderDish());
    // this.nameCountDishList.push(new DishView());
    // for (let i = 0; i < dish.consist.length; i++) {
    //   this.reservedIngredients[dish.consist[i].ingredient.id] = this.reservedIngredients[dish.consist[i].ingredient.id] === undefined ?
    //     dish.consist[i].value * this.countOfDishInOrder : this.reservedIngredients[dish.consist[i].ingredient.id] + dish.consist[i].value * this.countOfDishInOrder;
    // }
    // for (let i = 0; i < this.orderDishList.length; i++) {
    //   if (this.orderDishList[i].dish === undefined) {
    //     this.orderDishList[i].dish = dish;
    //     this.orderDishList[i].count = this.countOfDishInOrder;
    //   }
    //
    //   if (this.nameCountDishList[i].name === undefined) {
    //     this.nameCountDishList[i].name = dish.name;
    //     this.nameCountDishList[i].count = this.countOfDishInOrder;
    //   }
    // }
  }

  chooseCook(cook: Users) {
    this.choosedCook = cook;

  }

  getAllMyOrders(id: number) {
    this.orderService.getAllById(id).subscribe(resp => this.myOrders = resp);
  }

  createOrder() {
    let tempOrder = new Orders();
    tempOrder.comments = this.newOrder.comments;
    this.orderService.createOrder(tempOrder).subscribe((res: Orders) => {
      this.createdOrder = res;
      this.newOrder.id = res.id;
      this.newOrder.consist.forEach((x) => x.id.orderId = res.id);
      this.orderService.updateOrder(this.newOrder).subscribe(
        () => {
          this.ingredientService.debitIngredients(this.newOrder.consist).subscribe(
            (res) => {
              if (res === true) {
                // все хорошо, ингредиенты списались, ингредиентов хватило
              } else {
                // заказ не возможен, склад пуст, ингредиентов не хватило
              }
            });
          this.newHistory = new History();
          this.newHistory.order = new OrdersForHistory();
          this.newHistory.order.id = this.createdOrder.id;
          this.newHistory.statusId = 1;
          this.newHistory.user_id = 1; // Изменить на текующий!
          this.historyService.nextStatus(this.newHistory).subscribe();
          this.newHistory.statusId = 2;
          this.newHistory.user_id = this.choosedCook.id;
          this.historyService.nextStatus(this.newHistory).subscribe();
        }
      );
    });

    // this.orderService.createOrder(this.newOrder).subscribe(resp => this.createdOrder = resp);
    // this.newHistory = new History();
    // console.log(this.createdOrder);
    // this.newHistory.order_id = this.createdOrder.id;
    // this.newHistory.statusId = 1;
    // this.newHistory.user_id = 1; // Изменить на текующий!
    // this.historyService.nextStatus(this.newHistory).subscribe();
  }

  givenOrder(order: Orders) {
    this.newHistory = new History();
    this.newHistory.order = new OrdersForHistory();
    this.newHistory.order.id = order.id;
    this.newHistory.statusId = 5;
    this.newHistory.user_id = 2; // Изменить на текующий!
    this.historyService.nextStatus(this.newHistory).subscribe();
  }

  selectMyOrder(order: Orders) {
    this.selectedOrder = order;
    this.isChosed = true;
    for (const hist of order.historyList) {
      switch (hist.statusId) {
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

  minusOneDish(dish: Dish) {
    for (let i = 0; i < this.newOrder.consist.length; i++) {
      if (this.newOrder.consist[i].dish.id === dish.id) {
        if (this.newOrder.consist[i].count < 2) {
          return;
        }
        this.addToOrderDish(dish, -1);
        // this.changeFormValidator(dish);
        return;
      }
    }
  }

  plusOneDish(dish: Dish) {
    for (let i = 0; i < this.newOrder.consist.length; i++) {
      if (this.newOrder.consist[i].dish.id === dish.id) {
        if (((dish.maxCount - this.usedIngredientsInCurrentOrder(dish))) >= 1) {
          this.addToOrderDish(dish, 1);
        }
        return;
      }
    }
  }

  removeDishFromOrder(dish: Dish) {
    for (let i = 0; i < this.newOrder.consist.length; i++) {
      if (this.newOrder.consist[i].dish.id === dish.id) {
        // нашли такое блюдо, значит изменяем количество блюд на новое
        // сбрасываем старое прежнее зарезервированное количество ингредиентов
        for (let j = 0; j < dish.consist.length; j++) {
          this.reservedIngredients[dish.consist[j].ingredient.id] -= dish.consist[j].value * this.newOrder.consist[i].count;
        }
        this.newOrder.consist.splice(i, 1);
        this.changeFormValidator(dish);
      }
    }
  }
}
