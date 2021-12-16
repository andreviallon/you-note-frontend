import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" class="p-4">
      <mat-form-field class="w-full pt-2">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
      </mat-form-field>
      <mat-error
        *ngIf="
          loginForm.get('email')?.touched && loginForm.get('email')?.invalid
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
          loginForm.get('password')?.touched &&
          loginForm.get('password')?.invalid
        "
      >
        Password is required
      </mat-error>
      <mat-checkbox class="mb-4" formControlName="stayLoggedIn"
        >Stay logged in</mat-checkbox
      >
      <button
        mat-flat-button
        class="flex w-full"
        color="primary"
        (click)="login()"
        [disabled]="!loginForm.valid"
      >
        Login
      </button>
    </form>
  `,
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      stayLoggedIn: [false],
    });
  }

  public login(): void {
    console.log('login', this.loginForm);
  }
}
