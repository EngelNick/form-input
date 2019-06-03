import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl) {
  if (control.value) {
    const phone = /^\+[0-9]{13}$/;
    return phone.test(control.value) ? null : { error: 'Must match format (123) 456-7890' };
  }

  return null;
}
