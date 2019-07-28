import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {DishesComponent} from './dishes/dishes.component';
import {CookOrdersComponent} from './cook-orders/cook-orders.component';
import {WaiterOrdersComponent} from './waiter-orders/waiter-orders.component';
import {IngredientsReadOnlyComponent} from './ingredients-read-only/ingredients-read.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {HistoryComponent} from './history/history.component';

const routes: Routes = [
  {path: 'users',
    component: UsersComponent,

  },
  {path: 'ingredients',
    component: IngredientsComponent,

  },
  {
    path: 'history',
    component: HistoryComponent,

  },
  {
    path: 'ingredients-read',
    component: IngredientsReadOnlyComponent,

  },
  {path: 'dishes',
    component: DishesComponent,

  },
  {
    path: 'cookOrders',
    component: CookOrdersComponent,
  },

  {
    path: 'waiterOrders',
    component: WaiterOrdersComponent,
  },
  {
    path: 'allOrders',
    component: AllOrdersComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
