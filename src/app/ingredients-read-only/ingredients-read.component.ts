import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Ingredient} from './Ingredient';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IngredientService} from '../ingredients/ingredient.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients-read.component.html',
  styleUrls: ['./ingredients-read.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IngredientsReadOnlyComponent implements AfterViewInit {
  ingredients: Ingredient[];
  columnsToDisplay = ['id', 'name', 'measure'];
  columnsToDisplayMissing = ['id', 'name', 'measure'];
  missingIngredients: Ingredient[];
  resultsLength = 0;
  expandedElement: Ingredient | null;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private ingredientService: IngredientService) {
  }

  ngAfterViewInit() {
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

  getMissingIngredients() {
    // this.ingredientService.getMissingIngredients().subscribe((data: Ingredient[]) => this.missingIngredients = data);
  }
}
