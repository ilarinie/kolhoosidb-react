import { observable } from 'mobx';
import createBrowserHistory from '../history'
import * as ApiService from './api-service';
import {Commune} from "./models/commune";
import {User} from "./models/user";

export class AppState {

    // LogIn state
    @observable loggedIn: boolean = localStorage.getItem('token') !== null;

    // Loading indicators
    @observable loginLoading: boolean = false;
    @observable dashboardLoading: boolean = false;


    // Error indicators
    @observable loginError: boolean = false;
    @observable loginErrorMessage: string;

    // State data
    @observable selectedCommune?: Commune;
    @observable communes: Commune[];
    @observable current_user: User;
  
  
    constructor() {
    }
  
    selectCommune = (id: number): boolean => {
      if (this.communes[id] !== null) {
        this.selectedCommune = this.communes[id];
        createBrowserHistory.push('/');
      }
      return false;
    };
  
    logIn = (username: string, password:string) => {
        this.loginLoading = true;
        this.loginError = false;
        ApiService.login(username, password).then(() => {
             this.loginLoading = false;
             this.loggedIn = true;
             createBrowserHistory.push('/communelist')
        }).catch((error) => {
            this.loginLoading = false;
            this.loginError = true;
            this.loginErrorMessage = error;
        })
    };

    logOut = () => {
        localStorage.removeItem('token')
        this.loggedIn = false;
        createBrowserHistory.push('/login')
    }
  }