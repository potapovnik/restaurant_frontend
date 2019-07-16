import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ingredient} from './Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private path = '/restaurant/ingredients';
  private url: string;
  private idEvent: number;

  constructor(private http: HttpClient) {
  }

  getAllIngredients(): Observable<Ingredient[]> {
    const url = this.path;
    console.log('geturl ' + url);
    return this.http.get<Ingredient[]>(url);
  }
  createIngredient(ing: Ingredient) {
    const myHeaders  = new HttpHeaders().set('responseType', 'json');
    const url = this.path
    console.log(url, JSON.stringify(ing));
    this.http.post(url, JSON.stringify(ing), {headers: myHeaders}).subscribe(); // responseType = 'json'
  }
}
