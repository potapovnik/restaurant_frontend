import {AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IngredientService} from './ingredient.service';

export function validatorIngredientUniqueName(ingredientService: IngredientService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return ingredientService.checkIngredientNameUnique(control.value).map(
      res => {
        return (res) ? null : {'NameExists': 'Такой ингредиент уже существует'};
      }
    );
  };
}


