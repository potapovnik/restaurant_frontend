import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ingredient, IngredientApi} from '../utils/Ingredient';
import {IngredientPart} from '../utils/IngredientPart';
import {MissingIngredient} from '../utils/MissingIngredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredientsPath = '/restaurant/ingredients';
  private ingredientPartsPath = '/restaurant/ingredientparts';
  public refreshMissingIngredients$ = new Subject<boolean>();
  myHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  updateMissingIngredients(): Observable<MissingIngredient[]> {
    return this.http.get<MissingIngredient[]>(this.ingredientsPath + '/missing', {headers: this.myHeaders});
  }

  getUsedStorage(): Observable<number> {
    return this.http.get<number>(this.ingredientPartsPath + '/summaryVolume', {headers: this.myHeaders});
  }

  checkIngredientNameUnique(name: string): Observable<boolean> {
    return this.http.get<boolean>(this.ingredientsPath + '/check?name=' + name, {headers: this.myHeaders});
  }

  getAllIngredients(sort: string, order: string, pageIndex: number, pageSize: number): Observable<IngredientApi> {
    return this.http.get<IngredientApi>(
      this.ingredientsPath + '?pageIndex=' + pageIndex + '&sortedBy=' + sort + '&pageSize=' + pageSize + '&sortDir=' + order,
      {headers: this.myHeaders});
  }

  createIngredient(ing: Ingredient): Observable<Object> {
    return this.http.post(this.ingredientsPath, JSON.stringify(ing), {headers: this.myHeaders});
  }

  createIngredientPart(ingPart: IngredientPart): Observable<Object> {
    return this.http.post(this.ingredientPartsPath, JSON.stringify(ingPart), {headers: this.myHeaders});
  }

  deleteIngredient(ingId: number): Observable<Object> {
    return this.http.delete(this.ingredientsPath + '/' + String(ingId), {headers: this.myHeaders});
  }

  deleteIngredientPart(ingId: number): Observable<Object> {
    return this.http.delete(this.ingredientPartsPath + '/' + String(ingId), {headers: this.myHeaders});
  }
}
