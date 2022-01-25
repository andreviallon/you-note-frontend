import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserCredentials } from '../../model/user-credentials';
import { Login, Signup } from '../../state/user.action';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-login-page',
  template: `
    <div class="flex justify-center items-center h-full">
      <mat-card>
        <mat-card-header class="flex justify-center">
          <mat-card-title>Welcome to You Note</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-tab-group mat-align-tabs="center">
            <mat-tab label="Sign up">
              <app-signup-form
                [isLoading]="isLoading$ | async"
                (signup)="signup($event)"
              ></app-signup-form>
            </mat-tab>
            <mat-tab label="Login">
              <app-login-form
                [isLoading]="isLoading$ | async"
                (login)="login($event)"
              ></app-login-form>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @Select(UserState.isLoading) isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  public signup(userCredentials: UserCredentials): void {
    this.store.dispatch(new Signup(userCredentials));
  }

  public login(userCredentials: UserCredentials): void {
    this.store.dispatch(new Login(userCredentials));
  }
}
