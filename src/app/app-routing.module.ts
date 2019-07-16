import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {DishesComponent} from './dishes/dishes.component';

const routes: Routes = [
  {path: 'users',
    component: UsersComponent,

  },
  {path: 'ingredients',
    component: IngredientsComponent,

  },
  {path: 'dishes',
    component: DishesComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
