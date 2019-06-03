import { ValidationErrors } from '@angular/forms';

export function ValidateEqual(first: string, second: string, errorText: string): ValidationErrors | null {
  if (first && second) {
    return first === second ? null : {error: errorText};
  }

  return null;
}
