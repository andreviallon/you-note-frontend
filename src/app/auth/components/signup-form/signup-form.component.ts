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
  selector: 'app-signup-form',
  template: `
    <form [formGroup]="signupForm" class="p-4">
      <mat-form-field class="w-full pt-2">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
      </mat-form-field>
      <mat-error
        *ngIf="
          signupForm.get('email')?.touched && signupForm.get('email')?.invalid
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
          signupForm.get('password')?.touched &&
          signupForm.get('password')?.invalid
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
          signupForm.get('confirmPassword')?.touched &&
          signupForm.get('confirmPassword')?.invalid
        "
      >
        Confirm password is required
      </mat-error>
      <mat-error
        *ngIf="signupForm.get('password')?.touched && signupForm.get('confirmPassword')?.touched && signupForm.errors?.['notSame']"
      >
        Passwords do not match
      </mat-error>
      <button
        mat-flat-button
        class="flex w-full"
        color="primary"
        (click)="submit()"
        [disabled]="!signupForm.valid"
      >
        Signin
      </button>
    </form>
  `,
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  @Output() signup: EventEmitter<UserCredentials> = new EventEmitter();

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
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
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };

    this.signup.emit(user);
  }
}
