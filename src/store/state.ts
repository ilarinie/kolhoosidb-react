import { observable, autorun, toJS, extendObservable, action } from 'mobx';
import createBrowserHistory from '../history';
import * as ApiService from './api-service';
import { Commune } from './models/commune';
import { User } from './models/user';
import { KolhoosiError } from './error';
import { destroy } from './api-service';
import { persist } from 'mobx-persist';
import { UserStore } from './user-state';
import { UiState } from './ui-state';
import { AuthState } from './auth-state';
import { CommuneState } from './commune-state';

export class MainState {
  userState: UserStore;
  uiState: UiState;
  authState: AuthState;
  communeState: CommuneState;

  constructor() {
    this.userState = new UserStore(this);
    this.uiState = new UiState(this);
    this.authState = new AuthState(this);
    this.communeState = new CommuneState(this);
  }
}

export const mainState = new MainState();
