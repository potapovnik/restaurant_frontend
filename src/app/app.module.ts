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
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatIconModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DishesComponent } from './dishes/dishes.component';
import { WaiterOrdersComponent } from './waiter-orders/waiter-orders.component';
import { CookOrdersComponent } from './cook-orders/cook-orders.component';
import { UtilsComponent } from './utils/utils.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import {IngredientsReadOnlyComponent} from './ingredients-read-only/ingredients-read.component';
import {MissingIngredientsComponent} from './missing-ingredients/missing-ingredients.component';
import {StorageComponent} from './storage/storage.component';
import {CommonModule} from '@angular/common';
import {LoginformComponent} from './loginform/loginform.component';
import {HistoryComponent} from './history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    IngredientsComponent,
    DishesComponent,
    WaiterOrdersComponent,
    CookOrdersComponent,
    UtilsComponent,
    AllOrdersComponent,
    IngredientsReadOnlyComponent,
    MissingIngredientsComponent,
    StorageComponent,
    LoginformComponent,
    HistoryComponent,


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
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
