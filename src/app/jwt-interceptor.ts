import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from './auth/state/user.state';
import { Logout } from './auth/state/user.action';
import { ClearError } from './state/error.action';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(UserState.token);
    const isAuthenticated = this.store.selectSnapshot(
      UserState.isAuthenticated
    );

    this.store.dispatch(new ClearError());

    if (
      this.store.selectSnapshot(UserState.token) &&
      this.store.selectSnapshot(UserState.isExpired)
    ) {
      this.store.dispatch(new Logout());
    }

    if (isAuthenticated && token) {
      const modifiedReq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .append('Authorization', `Bearer ${token}`),
      });

      return next.handle(modifiedReq);
    } else {
      const modifiedReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });

      return next.handle(modifiedReq);
    }
  }
}
