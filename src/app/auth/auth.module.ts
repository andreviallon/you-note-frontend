import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user.state';
import { LoginPageComponent } from './connected-components/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { CommonModule } from '@angular/common';

const components = [
  LoginPageComponent,
  LoginFormComponent,
  SignupFormComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    NgxsModule.forFeature([UserState]),
    NgxsStoragePluginModule.forRoot({
      key: 'user.token',
    }),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class AuthModule {}
