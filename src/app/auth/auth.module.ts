import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user.state';
import { LoginPageComponent } from './connected-components/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const components = [
  LoginPageComponent,
  LoginFormComponent,
  SignupFormComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    NgxsModule.forRoot([UserState]),
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [...components],
})
export class AuthModule {}
