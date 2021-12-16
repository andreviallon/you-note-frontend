import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user.state';
import { LoginPageComponent } from './connected-components/login-page/login-page.component';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [NgxsModule.forRoot([UserState])],
  exports: [],
})
export class AuthModule {}
