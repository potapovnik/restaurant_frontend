import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ingredient} from './Ingredient';
import {IngredientPart} from './IngredientPart';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsPath = '/restaurant/ingredients';
  private ingredientPartsPath = '/restaurant/ingredientparts';

  constructor(private http: HttpClient) {
  }

  getAllIngredients(): Observable<Ingredient[]> {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Ingredient[]>(this.ingredientsPath, {headers: myHeaders});
  }
  createIngredient(ing: Ingredient) {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.ingredientsPath, JSON.stringify(ing), {headers: myHeaders}).subscribe();
  }
  createIngredientPart(ingPart: IngredientPart) {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.ingredientPartsPath, JSON.stringify(ingPart), {headers: myHeaders}).subscribe();
  }
  deleteIngredient(ingId: number) {
    const myHeaders  = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(this.ingredientsPath + '/' + String(ingId), {headers: myHeaders}).subscribe();
  }
}
