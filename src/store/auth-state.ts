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
        console.log(response);
        
        this.token = response.jwt;
        
        this.mainState.userState.current_user = response.user;
        
        if (this.mainState.userState.current_user.default_commune_id) {
          this.mainState.communeState.selectCommune(this.mainState.userState.current_user.default_commune_id);
        } else {
          createBrowserHistory.push('/communelist');
        }
      } catch (error) {
        console.log(error);
        this.mainState.uiState.loginError = error;
      } finally {
        this.mainState.uiState.loginLoading = false;
      }

    }
  
    @action
    logOut = () => {
      this.token = '';
      
      this.mainState.reset();
      sessionStorage.clear();
      localStorage.clear();
      createBrowserHistory.push('/login');
      
    }
}