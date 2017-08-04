import { UserService } from './user-service';
import { observable, autorun, toJS, extendObservable } from 'mobx';
import createBrowserHistory from '../history';
import * as ApiService from './api-service';
import { Commune } from './models/commune';
import { User } from './models/user';
import { destroy } from './api-service';

const fakeCommunes: Commune[] = [];
const fakeCommune1: Commune = new Commune;
fakeCommune1.name = 'Fake commune 1';
fakeCommune1.description = 'Fake desc.';
fakeCommune1.created_at = new Date(2017, 5, 5);
fakeCommune1.updated_at = new Date(2017, 5, 5);
fakeCommune1.purchases = [];
fakeCommune1.tasks = [];
fakeCommunes.push(fakeCommune1);

// This will autosave the state to sessionStorage to persist state
// even after refreshes.
function autoSave(store: any, save: any) {
  let firstRun = true;
  autorun(() => {
    // This code will run every time any observable property
    // on the store is updated.
    const json = JSON.stringify(toJS(store));
    if (!firstRun && store.loggedIn) {
      console.log('AppState is being saved to sessionStorage:');
      console.log(JSON.parse(json));
      save(json);
    }
    firstRun = false;
  });
}

export class AppState {

  // LogIn state
  @observable loggedIn: boolean = sessionStorage.getItem('token') !== null;

  // Loading indicators
  @observable loginLoading: boolean = false;
  @observable dashboardLoading: boolean = false;
  @observable registerLoading: boolean = false;

  // Error indicators
  @observable loginError: boolean = false;
  @observable loginErrorMessage: string;
  @observable registerErrors: any = {};

  // State data
  @observable communeSelected: boolean = false;
  @observable selectedCommune: Commune;
  @observable communes: Commune[] = fakeCommunes;
  @observable current_user: User;

  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load() {
    console.log('Trying to find AppState in sessionStorage');
    if (sessionStorage.getItem('appstate') !== null || sessionStorage.getItem('appstate') !== undefined) {
      console.log('AppState is being fetched from sessionStorage');
      const data: any = JSON.parse(sessionStorage.getItem('appstate') as string);
      extendObservable(this, data);
    }
  }

  save(json: string) {
    sessionStorage.setItem('appstate', json);
  }

  // COMMUNE RELATED METHODS
  selectCommune = (id: number) => {
    if (this.communes[id] !== null) {
      this.selectedCommune = this.communes[id];
      this.communeSelected = true;
      createBrowserHistory.push('/');
    }
  }

  createCommune = (commune: Commune) => {
    let payload = JSON.stringify({ commune: commune });
    ApiService.post('/communes', payload).then((response) => {
      console.log('ApiService provided response (createCommune:');
      console.log(response);
      this.communes.push(response.commune as Commune);
      this.selectCommune(this.communes.length - 1);
    }).catch((error) => {
      console.log('ApiService provided error (createCommune):');
      console.log(error);
    });
  }

  deleteCommune = (id: number) => {
    console.log(`DeleteCommune method called in AppState, id: ${id}`);
    ApiService.destroy('communes/' + id).then((response) => {
      console.log('ApiService provided response (deleteCommune):');
      console.log(response);
      console.log(this.communes.findIndex(commune => commune.id === id));
      this.communes.splice(this.communes.findIndex(commune => commune.id === id), 1);
    }).catch((error: any) => {
      console.log('ApiService provided error (deleteCommune):');
      console.log(error);
    });
  }

  // USER RELATED METHODS
  getUser = () => {
    ApiService.get('/users/' + this.current_user.id).then((response) => {
      this.current_user = response.json() as User;
    });
  }

  updateUser = (user: User) => {
    ApiService.put('/users/' + this.current_user.id, user).then((response) => {
      this.current_user = response.json() as User;
    });
  }
  deleteUser = () => {
    ApiService.destroy('/users/' + this.current_user.id).then((response) => {
      this.logOut();
    });
  }
  createUser = (user: User) => {
    this.registerErrors = [];
    this.registerLoading = true;
    let payload = JSON.stringify({ user: user });
    console.log('CreateUser function called in AppState. User:');
    console.log(user);
    ApiService.post('users/', payload).then((response) => {
      console.log('ApiService provided response:');
      console.log(response);
      let createdUser: User = response as User;
      this.logIn(user.username, user.password as string);
      this.registerLoading = false;
    }).catch((error: any) => {
      console.log('ApiService provided error:');
      console.log(error);
      this.registerErrors = error.error;
      this.registerLoading = false;
    });
  }

  logIn = (username: string, password: string) => {
    this.loginLoading = true;
    this.loginError = false;
    console.log(`Log in function called in AppState: username: ${username}, password: ${password}`);
    ApiService.login(username, password).then((response) => {
      // tslint:disable-next-line:no-empty
      while (response.jwt === null) { }
      console.log(`Login function in ApiService returned:`);
      console.log(response);
      sessionStorage.setItem('token', response.jwt);
      this.loginLoading = false;
      this.loggedIn = true;
      if (this.communeSelected) {
        console.log('Login function redirecting to dashboard.');
        createBrowserHistory.push('/');
      } else {
        console.log('Login function redirecting to commune list.');
        createBrowserHistory.push('/communelist');
      }
    }).catch((error) => {
      this.loginLoading = false;
      this.loginError = true;
      this.loginErrorMessage = error;
    });
  }

  logOut = () => {
    sessionStorage.clear();
    console.log(`Session storage cleared by logout function.`);
    this.loggedIn = false;
    createBrowserHistory.push('/login');
  }
}