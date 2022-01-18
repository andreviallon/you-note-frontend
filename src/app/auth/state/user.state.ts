import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../model/user';
import { Login, Logout, Signup } from './user.action';
import { JwtResponse } from '../model/jwt-response';
import jwtDecode from 'jwt-decode';
import { Token } from '../model/token';
import { SetError } from 'src/app/state/error.action';

// @ts-ignore
const URL = process.env.API_URL || 'http://localhost:3000';

export class UserStateModel {
  token: string | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: undefined,
  },
})
@Injectable()
export class UserState {
  @Selector()
  static user(state: UserStateModel): User | undefined {
    return state.token ? (jwtDecode(state.token) as User) : undefined;
  }

  @Selector()
  static token(state: UserStateModel): string | undefined {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: UserStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static isExpired(state: UserStateModel): boolean {
    if (state.token) {
      const { exp } = jwtDecode(state.token) as Token;

      if (exp < new Date().getTime() / 1000) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  constructor(private http: HttpClient) {}

  @Action(Signup)
  async signup(
    { dispatch }: StateContext<UserStateModel>,
    { userCredentials }: Login
  ) {
    this.http
      .post(`${URL}/auth/signup`, {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      .subscribe({
        next: () => {
          return dispatch(new Login(userCredentials));
        },
        error: (error) => {
          dispatch(new SetError(error.error.message));
        },
      });
  }

  @Action(Login)
  async login(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { userCredentials }: Login
  ) {
    this.http
      .post(`${URL}/auth/signin`, {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      .subscribe({
        next: (res) => {
          const { accessToken } = res as JwtResponse;

          patchState({ token: accessToken });
        },
        error: () => {
          dispatch(new SetError('incorrect credentials'));
        },
      });
  }

  @Action(Logout)
  async logout({ patchState }: StateContext<UserStateModel>) {
    patchState({ token: undefined });
  }
}
