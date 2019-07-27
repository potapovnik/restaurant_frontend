import {IngredientService} from './ingredient.service';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

export function validatorIngredientPartValueLessStorage(ingredientService: IngredientService, maxStorageVolume: number,
                                                        volumePerUnit: number): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return ingredientService.getUsedStorage().map(
      res => {
        if (control.value * volumePerUnit <= maxStorageVolume - res) {
          return null;
        } else {
          return {'notEnoughSpace': true};
        }
      }
    );
  };
}
