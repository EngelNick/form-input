import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidateEqual } from '../validators/validate-confirm-password';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormInputComponent),
    multi: true,
  },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input() type = 'text';
  @Input() placeholder = 'text';
  @Input() equalErrorText = 'Confirm not equal to previous value';
  @Input() equalToControl: AbstractControl;
  @Input() errors: any;

  control: AbstractControl;
  private innerValue: boolean;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => {};
  private subscription: Subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.equalToControl) {
      this.subscription.add(
        this.equalToControl.valueChanges
          .subscribe(() => {
            this.control.updateValueAndValidity();
            this.cd.detectChanges();
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.cd.detectChanges();
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;

    if (this.equalToControl && control.valid) {
      return ValidateEqual(this.control.value, this.equalToControl.value, this.equalErrorText);
    }
    return control.invalid ? this.control.errors : null;
  }

}
