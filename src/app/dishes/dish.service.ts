import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dish} from './Dish';
import {DishConsist} from './DishConsist';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishesPath = '/restaurant/dishes';
  private dishIngredientPath = '/restaurant/dishes/consist';

  constructor(private http: HttpClient) {
  }

  getAllDishes(sort: string, order: string, pageIndex: number, pageSize: number): Observable<Dish[]> {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Dish[]>(this.dishesPath, {headers: myHeaders});
  }

  createDish(dish: Dish) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.dishesPath, JSON.stringify(dish), {headers: myHeaders}).subscribe();
  }

  deleteDishIngredient(dishId: number, ingId: number) {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(this.dishIngredientPath + '/' + String(dishId) + '/' + String(ingId), {headers: myHeaders}).subscribe();
  }

  createDishConsist(newCons: DishConsist) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.dishIngredientPath, JSON.stringify(newCons), {headers: myHeaders}).subscribe();
  }

}
