import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidateEquality(comparedControl: AbstractControl, errorText: string = 'Not equal data'): ValidatorFn {
  let subscription;
  return function checkEquality(control: AbstractControl): ValidationErrors | null {
    if (!subscription) {
      subscription = comparedControl.valueChanges
        .subscribe(() => control.updateValueAndValidity());
    }
    return control.value === comparedControl.value ? null : {error: errorText};
  };
}
