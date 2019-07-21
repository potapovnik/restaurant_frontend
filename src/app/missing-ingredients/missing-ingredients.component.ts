import {AfterViewInit, Component} from '@angular/core';

import {MissingIngredient} from './MissingIngredient';
import {IngredientService} from '../ingredients/ingredient.service';


@Component({
  selector: 'app-missing-ingredients',
  templateUrl: './missing-ingredients.component.html',
  styleUrls: ['./missing-ingredients.component.scss'],
})
export class MissingIngredientsComponent implements AfterViewInit {

  columnsToDisplay = ['id', 'name', 'measure', 'amount', 'needAmount'];
  missingIngredients: MissingIngredient[];
  resultsLength = 0;

  constructor(private ingredientService: IngredientService) {
  }

  ngAfterViewInit() {
    this.getMissingIngredients();
  }

  getMissingIngredients() {
    this.ingredientService.getMissingIngredients().subscribe((data: MissingIngredient[]) => this.missingIngredients = data);
  }
}
