import { Component, OnInit } from '@angular/core';
import {Ingredient} from './Ingredient';
import {IngredientService} from './ingredient.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  newIngredient: Ingredient = new Ingredient();
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => this.ingredients = data);
  }

  createIng() {
    this.ingredientService.createIngredient(this.newIngredient);
  }
}
