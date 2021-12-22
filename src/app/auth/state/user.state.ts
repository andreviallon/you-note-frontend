import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { Login, Logout, Signup } from './user.action';
import { JwtResponse } from '../model/jwt-response';
import jwtDecode from 'jwt-decode';

const URL = environment.apiUrl;

export class UserStateModel {
  token: string | undefined;
  errorMessage: string | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    token: undefined,
    errorMessage: undefined,
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
  static errorMessage(state: UserStateModel): string | undefined {
    return state.errorMessage;
  }

  constructor(private http: HttpClient) {}

  @Action(Signup)
  async signup(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { userCredentials }: Login
  ) {
    this.http
      .post(`${URL}/auth/signup`, {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      .subscribe({
        next: () => {
          console.log('next');

          return dispatch(new Login(userCredentials));
        },
        error: (error) => {
          patchState({ errorMessage: error.error.message });
        },
      });
  }

  @Action(Login)
  async login(
    { patchState }: StateContext<UserStateModel>,
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

          patchState({
            token: accessToken,
            errorMessage: undefined,
          });
        },
        error: (error) => {
          console.log('error', error);

          patchState({ errorMessage: error.error.message });
        },
      });
  }

  @Action(Logout)
  async logout({ patchState }: StateContext<UserStateModel>) {
    patchState({ token: undefined });
  }
}
