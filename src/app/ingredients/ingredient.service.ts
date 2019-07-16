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

  private url: string;
  private idEvent: number;

  constructor(private http: HttpClient) {
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsPath);
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
    this.http.delete(this.ingredientsPath + String(ingId)).subscribe();
  }
}
