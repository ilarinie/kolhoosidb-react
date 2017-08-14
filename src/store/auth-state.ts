import { MainState } from './state';
import * as ApiService from './api-service';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import createBrowserHistory from '../history';

export class AuthState {
    mainState: MainState;

    // LogIn state
    @persist @observable token: string = '';

    constructor(mainState: MainState) {
        this.mainState = mainState;
    }

    @action
    logIn = (username: string, password: string) => {
      this.mainState.uiState.loginLoading = true;
      this.mainState.uiState.loginError.isError = false;
      ApiService.post('usertoken', { auth: { username: username, password: password}}).then((response) => {
        sessionStorage.setItem('token', response.jwt);
        this.token = response.jwt;
        this.mainState.uiState.loginLoading = false;
        // this.loggedIn = true;
        createBrowserHistory.push('/communelist');
      }).catch((error) => {
        this.mainState.uiState.loginLoading = false;
        this.mainState.uiState.loginError = error;
      });
    }
  
    @action
    logOut = () => {
      sessionStorage.clear();
      // this.loggedIn = false;
      this.token = '';
      createBrowserHistory.push('/login');
    }
}