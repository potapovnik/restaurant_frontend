import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Dish} from '../utils/dish';
import {DishConsist} from '../utils/DishConsist';
import {DishService} from './dish.service';
import {Ingredient, IngredientApi} from '../utils/Ingredient';
import {IngredientService} from '../ingredients/ingredient.service';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject, merge, of as observableOf} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DishesComponent implements AfterViewInit {
  ID = 'id';
  NAME = 'name';
  TYPE = 'type';
  COST = 'cost';
  ISMENU = 'ismenu';
  dishes: Dish[] = [];
  ingredients: Ingredient[] = [];
  filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filter = '';
  newConsist: DishConsist = {id: {dishId: 0, ingredientId: 0}, ingredient: new Ingredient(), value: 0};
  columnsToDisplay = ['id', 'name', 'type', 'cost', 'ismenu', 'consist'];
  resultsLength = 0;
  expandedElement?: Dish | null;
  _newConsist: FormGroup;
  _newDishForm: FormGroup;
  _editDishForm: FormGroup;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private dishesService: DishService, private ingredientService: IngredientService, private fb: FormBuilder) {
    this._newDishForm = fb.group({
      name: fb.control(undefined, [Validators.required]),
      type: fb.control(undefined, [Validators.required]),
      cost: fb.control(undefined, [Validators.min(0.01), Validators.required]),
      ismenu: fb.control(false, [Validators.required])
    });
    this._editDishForm = fb.group({
      id: fb.control(undefined, [Validators.required]),
      name: fb.control(undefined, [Validators.required]),
      type: fb.control(undefined, [Validators.required]),
      cost: fb.control(undefined, [Validators.min(0.01), Validators.required]),
      ismenu: fb.control(undefined, [Validators.required])
    });
    this._newConsist = fb.group({
      ingredientId: fb.control( undefined, [Validators.required]),
      value: fb.control( undefined, [Validators.min(0.000001), Validators.required]),
    });
  }

  setEditDishForm(id: number, name: string, type: string, cost: number, ismenu: boolean) {
    this._editDishForm.controls[this.ID].setValue(id);
    this._editDishForm.controls[this.NAME].setValue(name);
    this._editDishForm.controls[this.TYPE].setValue(type);
    this._editDishForm.controls[this.COST].setValue(cost);
    this._editDishForm.controls[this.ISMENU].setValue(ismenu);
  }

  ngAfterViewInit() {
    this.filter$.pipe(
      distinctUntilChanged(), debounceTime(300), map(data => {
        this.filter = data;
      }),
      switchMap(() => {
        return this.dishesService
          .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      })).subscribe((data: Dish[]) => {
      this.dishes = data;
    });

    this.getAllIngredients();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.dishesService
            .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
        }),
        map(data => {
          this.resultsLength = data.totalCount;
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  applyFilter(value: string) {
    this.filter$.next(value);
  }

  getAllIngredients() {
    this.ingredientService.getAllIngredients('id', '', 0, 10000)
      .subscribe((data: IngredientApi) => this.ingredients = data.items);
  }

  updateDish() {
    this.dishesService.createDish(this._editDishForm.value as Dish).pipe(
      switchMap(() => {
        return this.dishesService
          .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  createDish() {
    this.dishesService.createDish(this._newDishForm.value as {name: string, type: string, cost: number, ismenu: boolean}).pipe(
      switchMap(() => {
        return this.dishesService
          .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }


  deleteConsist(dishId: number, ingId: number) {
    this.dishesService.deleteDishIngredient(dishId, ingId).pipe(
      switchMap(() => {
        return this.dishesService
          .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  createDishConsist(_dishId: number) {
    this.dishesService.createDishConsist(
      {value:  (this._newConsist.value as {value: number, ingredientId: number}).value, id:
          {ingredientId: (this._newConsist.value as {value: number, ingredientId: number}).ingredientId, dishId: _dishId}}).pipe(
      switchMap(() => {
        return this.dishesService
          .getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }
}
