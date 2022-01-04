import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearError, SetError } from './error.action';

export class ErrorStateModel {
  message: string | undefined;
}

@State<ErrorStateModel>({
  name: 'error',
  defaults: {
    message: undefined,
  },
})
@Injectable()
export class ErrorState {
  @Selector()
  static message(state: ErrorStateModel): string | undefined {
    return state.message;
  }

  @Action(SetError)
  signup({ patchState }: StateContext<ErrorStateModel>, { message }: SetError) {
    patchState({ message });
  }

  @Action(ClearError)
  async logout({ patchState }: StateContext<ClearError>) {
    patchState({ message: undefined });
  }
}
