import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dish} from './Dish';


@Injectable({
  providedIn: 'root'
})
export class DishService {
  private dishesPath = '/restaurant/dishes';

  constructor(private http: HttpClient) {
  }

  getAllDishes(): Observable<Dish[]> {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Dish[]>(this.dishesPath, {headers: myHeaders});
  }
  createDish(ing: Dish) {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.dishesPath, JSON.stringify(ing), {headers: myHeaders}).subscribe();
  }

}
