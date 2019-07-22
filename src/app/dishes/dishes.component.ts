import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Dish} from './Dish';
import {DishService} from './dish.service';
import {Ingredient, IngredientApi} from '../ingredients/Ingredient';
import {IngredientService} from '../ingredients/ingredient.service';
import {DishConsist, EmbeddedId} from './DishConsist';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  dishes: Dish[];
  ingredients: Ingredient[];
  newDish: Dish = new Dish();
  editedDish: Dish = new Dish();

  newConsist: DishConsist = new DishConsist();
  columnsToDisplay = ['id', 'name', 'type', 'cost', 'ismenu', 'consist'];
  resultsLength = 0;
  expandedElement: Dish | null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private dishesService: DishService, private ingredientService: IngredientService) {
    this.newDish.ismenu = false;
  }

  ngAfterViewInit() {
    // this.getAllDishes();

    this.getAllIngredients();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.dishesService.getAllDishes(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
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
    this.newConsist.id = new EmbeddedId();
    // this.newDish.name = 'Новое тестовое блюдо';
    // this.newDish.type = 'второе';
    // this.newDish.cost = 11.2;
    // this.newDish.ismenu = true;
    // this.newDish.consist = [];

    // this.newDish.consist = [{ value: 3, ingredient: {id: 1, name: 'Картофель', measure: 'кг', parts: [] } } ];
  }

  getAllIngredients() {
    this.ingredientService.getAllIngredients('id', '', 0, 1000).subscribe((data: IngredientApi) => this.ingredients = data.items);
  }

  chooseDish(choosed: Dish) {
    this.editedDish = choosed;
  }

  updateDish() {
    this.dishesService.createDish(this.editedDish);
  }
  getAllDishes() {
    // this.dishesService.getAllDishes().subscribe((data: Dish[]) => this.dishes = data);
  }
  createDish() {
    this.dishesService.createDish(this.newDish);
  }


  deleteConsist(dishId: number, ingId: number) {
    this.dishesService.deleteDishIngredient(dishId, ingId);
  }

  createDishConsist(newCon: DishConsist, dishId: number) {
    newCon.id.dishId = dishId;
    this.dishesService.createDishConsist(newCon);
  }
}
