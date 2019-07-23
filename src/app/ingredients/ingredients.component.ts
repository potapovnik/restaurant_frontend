import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Ingredient} from './Ingredient';
import {IngredientService} from './ingredient.service';
import {IngredientPart} from './IngredientPart';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MissingIngredient} from './MissingIngredient';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IngredientsComponent implements AfterViewInit {
  ingredients: Ingredient[];
  columnsToDisplay = ['id', 'name', 'measure', 'delete'];
  columnsToDisplayMissing = ['id', 'name', 'measure', 'amount', 'needAmount'];
  isMissing: boolean[] = [];
  missingIngredients: MissingIngredient[];
  newIngredient: Ingredient = new Ingredient();
  newIngredientPart: IngredientPart = new IngredientPart();
  resultsLength = 0;
  expandedElement: Ingredient | null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private ingredientService: IngredientService) {
  }

  ngAfterViewInit() {
    // this.getAllIngredients();
    this.getMissingIngredients();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.ingredientService
            .getAllIngredients(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.resultsLength = data.totalCount;
          return data.items;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((data: Ingredient[]) => {
      this.ingredients = data;
    });
  }

  getAllIngredients() {
    // this.ingredientService.getAllIngredients('sort', 'direction', 0).subscribe((data: Ingredient[]) => this.ingredients = data);
  }

  getMissingIngredients() {
    this.ingredientService.getMissingIngredients().subscribe((data: MissingIngredient[]) => this.missingIngredients = data);
  }

  createIng() {
    this.ingredientService.createIngredient(this.newIngredient).pipe(
      switchMap(() => {
        return this.ingredientService
          .getAllIngredients(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
  }

  createIngPart(ingId: number) {
    this.newIngredientPart.ingredientId = ingId;
    this.newIngredientPart.id = undefined;
    this.ingredientService.createIngredientPart(this.newIngredientPart).pipe(
      switchMap(() => {
        return this.ingredientService
        .getAllIngredients(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(data => {
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe((data: Ingredient[]) => {
      this.ingredients = data;
    });
  }

  deleteIngredient(id: number) {
    let name: string;
    let inArrayIndex: number;
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id === id) {
        name = this.ingredients[i].name;
        inArrayIndex = id;
      }
    }
    if (confirm('Вы точно хотите удалить ингредиент ' + name + ' и все его партии?')) {
      this.ingredientService.deleteIngredient(id);
      this.ingredients.splice(inArrayIndex, 1);
    }
  }

  deleteIngPart(ingr: Ingredient, part: IngredientPart) {
    if (confirm('Вы точно хотите удалить партию с Id = ' + part.id + '?')) {
      ingr.parts.splice(ingr.parts.indexOf(part), 1);
      this.ingredientService.deleteIngredientPart(part.id);
    }
  }
}
