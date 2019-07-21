import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ingredient, IngredientApi} from './Ingredient';
import {IngredientPart} from './IngredientPart';
import {MissingIngredient} from './MissingIngredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsPath = '/restaurant/ingredients';
  private ingredientPartsPath = '/restaurant/ingredientparts';
  myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
  }

  getMissingIngredients(): Observable<MissingIngredient[]> {
    return this.http.get<MissingIngredient[]>(this.ingredientsPath + '/missing', {headers: this.myHeaders});
  }

  getAllIngredients(sort: string, order: string, pageIndex: number, pageSize: number): Observable<IngredientApi> {
    return this.http.get<IngredientApi>(
      this.ingredientsPath + '?pageIndex=' + pageIndex + '&sortedBy=' + sort + '&pageSize=' + pageSize + '&sortDir=' + order,
      {headers: this.myHeaders});
  }
  createIngredient(ing: Ingredient) {
    this.http.post(this.ingredientsPath, JSON.stringify(ing), {headers: this.myHeaders}).subscribe();
  }
  createIngredientPart(ingPart: IngredientPart) {
    this.http.post(this.ingredientPartsPath, JSON.stringify(ingPart), {headers: this.myHeaders}).subscribe();
  }
  deleteIngredient(ingId: number) {
    this.http.delete(this.ingredientsPath + '/' + String(ingId), {headers: this.myHeaders}).subscribe();
  }

  deleteIngredientPart(ingId: number) {
    this.http.delete(this.ingredientPartsPath + '/' + String(ingId), {headers: this.myHeaders}).subscribe();
  }
}
