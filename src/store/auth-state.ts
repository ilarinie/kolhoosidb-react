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
    async logIn(username: string, password: string) {
      this.mainState.uiState.loginLoading = true;
      this.mainState.uiState.loginError.isError = false;
      try {
        let response = await ApiService.post('usertoken', { auth: { username: username, password: password}});
        this.token = response.jwt;
        createBrowserHistory.push('/communelist');
      } catch (error) {
        this.mainState.uiState.loginError = error;
      } finally {
        this.mainState.uiState.loginLoading = false;
      }

    }
  
    @action
    logOut = () => {
      sessionStorage.clear();
      this.token = '';
      createBrowserHistory.push('/login');
    }
}