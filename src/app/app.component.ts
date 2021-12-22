import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login, Logout } from './auth/state/user.action';
import { UserState } from './auth/state/user.state';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(UserState.isAuthenticated) isAuthenticated$!: Observable<boolean>;

  constructor(private actions: Actions, private router: Router) {}

  public ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Login)).subscribe(() => {
      this.router.navigate(['/notes']);
    });

    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });

    this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) this.router.navigate(['/notes']);
    });
  }
}
