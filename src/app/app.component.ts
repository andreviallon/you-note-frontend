import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login, Logout } from './auth/state/user.action';
import { UserState } from './auth/state/user.state';
import { ErrorState } from './state/error.state';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(UserState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  @Select(ErrorState.message) message$!: Observable<string | undefined>;

  constructor(
    private actions: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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

    this.message$.subscribe((message) => {
      if (message) {
        this.openSnackBar(message);
      }
    });
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message);
  }
}
