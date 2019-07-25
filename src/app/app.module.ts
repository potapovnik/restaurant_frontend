import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule, MatCardModule, MatExpansionModule,
  MatTableModule, MatPaginatorModule, MatSortModule,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {FormsModule} from '@angular/forms';
import { DishesComponent } from './dishes/dishes.component';
import { WaiterOrdersComponent } from './waiter-orders/waiter-orders.component';
import { CookOrdersComponent } from './cook-orders/cook-orders.component';
import { UtilsComponent } from './utils/utils.component';
import {IngredientsReadOnlyComponent} from './ingredients-read-only/ingredients-read.component';
import {MissingIngredientsComponent} from './missing-ingredients/missing-ingredients.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    IngredientsComponent,
    DishesComponent,
    WaiterOrdersComponent,
    CookOrdersComponent,
    UtilsComponent,
    IngredientsReadOnlyComponent,
    MissingIngredientsComponent,
    AllOrdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
