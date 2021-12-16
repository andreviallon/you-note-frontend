import { Component, OnInit } from '@angular/core';

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
              <app-sign-form></app-sign-form>
            </mat-tab>
            <mat-tab label="Login">
              <app-login-form></app-login-form>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
