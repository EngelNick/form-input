import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  if (control.value) {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.test(control.value) ? null : {error: 'Incorrect email'};
  }

  return null;
}
