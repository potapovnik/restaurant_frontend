import { Component, OnInit } from '@angular/core';
import {Ingredient} from './Ingredient';
import {IngredientService} from './ingredient.service';
import {IngredientPart} from './IngredientPart';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  newIngredient: Ingredient = new Ingredient();
  newIngredientPart: IngredientPart = new IngredientPart();
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => this.ingredients = data);
  }

  createIng() {
    this.ingredientService.createIngredient(this.newIngredient);
  }
  createIngPart(ingId: number) {
    this.newIngredientPart.ingredientId = ingId;
    this.ingredientService.createIngredientPart(this.newIngredientPart);
  }
  deleteIngredient(id: number) {
    let name: string;
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id === id) {
        name = this.ingredients[i].name;
      }
    }
    if (confirm('Вы точно хотите удалить ингредиент ' + name + ' и все его партии?')) {
      this.ingredientService.deleteIngredient(id);
    }
  }
}
