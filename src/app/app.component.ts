import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from './shared/validators/validate-email';
import { Subscription } from 'rxjs';
import { ValidateEquality } from './shared/validators/validate-equality';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    const password = new FormControl(null, [Validators.required]);
    this.formGroup = this.formBuilder.group({
      field: [null, [
        ValidateEmail, Validators.required
      ]],
      password: password,
      confirm: [null, [Validators.required, ValidateEquality(password, 'Passport do not match')]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
