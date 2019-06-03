import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from './shared/validators/validate-email';
import { Subscription } from 'rxjs';

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
    this.formGroup = this.formBuilder.group({
      field: [null, [
        ValidateEmail, Validators.required
      ]]
      ,
      password: [null, [Validators.required]],
      confirm: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
