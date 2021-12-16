import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/connected-components/login-page/login-page.component';
import { NotePageComponent } from './note/connected-components/note-page/note-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'notes', component: NotePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
