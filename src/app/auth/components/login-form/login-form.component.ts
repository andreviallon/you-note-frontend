import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from '../../model/user-credentials';

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
      <button
        mat-flat-button
        class="flex w-full"
        color="primary"
        (click)="submit()"
        [disabled]="!loginForm.valid || isLoading"
      >
        <span>Login</span>
        <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
      </button>
    </form>
  `,
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() isLoading!: boolean | null;
  @Output() login: EventEmitter<UserCredentials> = new EventEmitter();

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      stayLoggedIn: [false],
    });
  }

  public submit(): void {
    const user: UserCredentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.login.emit(user);
  }
}
