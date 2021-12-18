import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserCredentials } from '../../model/user-credentials';

@Component({
  selector: 'app-sign-form',
  template: `
    <form [formGroup]="signinForm" class="p-4">
      <mat-form-field class="w-full pt-2">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
      </mat-form-field>
      <mat-error
        *ngIf="
          signinForm.get('email')?.touched && signinForm.get('email')?.invalid
        "
      >
        Email is required
      </mat-error>
      <mat-form-field class="w-full pt-2">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" />
      </mat-form-field>
      <mat-error
        *ngIf="
          signinForm.get('password')?.touched &&
          signinForm.get('password')?.invalid
        "
      >
        Password is required
      </mat-error>
      <mat-form-field class="w-full pt-2">
        <mat-label>Confirm password</mat-label>
        <input matInput formControlName="confirmPassword" type="password" />
      </mat-form-field>
      <mat-error
        *ngIf="
          signinForm.get('confirmPassword')?.touched &&
          signinForm.get('confirmPassword')?.invalid
        "
      >
        Confirm password is required
      </mat-error>
      <mat-error
        *ngIf="signinForm.get('password')?.touched && signinForm.get('confirmPassword')?.touched && signinForm.errors?.['notSame']"
      >
        Passwords do not match
      </mat-error>
      <mat-checkbox class="mb-4" formControlName="stayLoggedIn"
        >Stay logged in</mat-checkbox
      >
      <button
        mat-flat-button
        class="flex w-full"
        color="primary"
        (click)="submit()"
        [disabled]="!signinForm.valid"
      >
        Signin
      </button>
    </form>
  `,
  styleUrls: ['./sign-form.component.scss'],
})
export class SignFormComponent implements OnInit {
  @Output() signin: EventEmitter<UserCredentials> = new EventEmitter();

  public signinForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.signinForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        stayLoggedIn: [false],
      },
      { validators: this.matchPasswords }
    );
  }

  public matchPasswords: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  };

  public submit(): void {
    const user: UserCredentials = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
      stayLoggedIn: this.signinForm.get('stayLoggedIn')?.value,
    };

    this.signin.emit(user);
  }
}
