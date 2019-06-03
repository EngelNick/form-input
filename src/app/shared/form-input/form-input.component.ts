import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
export class FormInputComponent implements ControlValueAccessor, Validator, OnDestroy {

  @Input() type = 'text';
  @Input() placeholder = 'text';

  control: AbstractControl;
  private innerValue: boolean;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => {};
  private controlStatus: string;
  private subscription: Subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
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
    this.subscribeOnControlStatusChanges();
    return control.invalid ? control.errors : null;
  }

  private subscribeOnControlStatusChanges() {
    if (!this.controlStatus) {
      this.subscription.add(
        this.control.statusChanges
          .pipe(
            filter((status: string) => !this.controlStatus || this.controlStatus !== status),
            tap((status: string) => this.controlStatus = status)
          )
          .subscribe(() => this.cd.detectChanges())
      );
    }
  }

}
