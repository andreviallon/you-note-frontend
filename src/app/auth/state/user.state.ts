import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../model/user';
import { Login, Logout, Signup } from './user.action';
import { JwtResponse } from '../model/jwt-response';
import jwtDecode from 'jwt-decode';
import { Token } from '../model/token';
import { SetError } from 'src/app/state/error.action';
import { environment } from 'src/environments/environment';

const URL = environment.apiUrl;

export class UserStateModel {
  token: string | undefined;
  isLoading: boolean = false;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: undefined,
    isLoading: false,
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
  static isLoading(state: UserStateModel): boolean {
    return state.isLoading;
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
    { dispatch, patchState }: StateContext<UserStateModel>,
    { userCredentials }: Login
  ) {
    patchState({ isLoading: true });
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
          patchState({ isLoading: false });
          dispatch(new SetError(error.error.message));
        },
      });
  }

  @Action(Login)
  async login(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { userCredentials }: Login
  ) {
    patchState({ isLoading: true });
    this.http
      .post(`${URL}/auth/signin`, {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      .subscribe({
        next: (res) => {
          const { accessToken } = res as JwtResponse;

          patchState({ token: accessToken, isLoading: false });
        },
        error: () => {
          dispatch(new SetError('incorrect credentials'));
          patchState({ isLoading: false });
        },
      });
  }

  @Action(Logout)
  async logout({ patchState }: StateContext<UserStateModel>) {
    patchState({ token: undefined });
  }
}
