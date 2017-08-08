import { observable, autorun, toJS, extendObservable } from 'mobx';
import createBrowserHistory from '../history';
import * as ApiService from './api-service';
import { Commune } from './models/commune';
import { User } from './models/user';
import { log, catAppState } from '../log-config';
import { KolhoosiError } from './error';
import { destroy } from './api-service';
// This will autosave the state to sessionStorage to persist state
// even after refreshes.
function autoSave(store: any, save: any) {
  let firstRun = true;
  autorun(() => {
    // This code will run every time any observable property
    // on the store is updated.
    const json = JSON.stringify(toJS(store));
    if (!firstRun && store.loggedIn) {
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
  @observable dataLoading: boolean = false;

  // Error indicators
  @observable loginError: KolhoosiError = new KolhoosiError('', []);
  @observable registerError: KolhoosiError = new KolhoosiError('', []);
  @observable snackbarMessage: string = '';
  @observable showSnackbar: boolean = false;
  @observable dataError: KolhoosiError = new KolhoosiError('', []);

  // State data
  @observable communeSelected: boolean = false;
  @observable selectedCommune: Commune;
  @observable communes: Commune[] = [];
  @observable current_user: User;

  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }
  load() {
    if (sessionStorage.getItem('appstate') !== null || sessionStorage.getItem('appstate') !== undefined) {
      const data: any = JSON.parse(sessionStorage.getItem('appstate') as string);
      extendObservable(this, data);
    }
  }
  save(json: string) {
    sessionStorage.setItem('appstate', json);
  }

  showDashboardError = (message: string) => {
    this.snackbarMessage = message;
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    },         4000);
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
    let payload = { commune: commune };
    ApiService.post('communes', payload).then((response) => {
      this.communes.push(response.commune as Commune);
      this.selectCommune(this.communes.length - 1);
    }).catch((error) => {
      this.showDashboardError(error.message);
    });
  }

  deleteCommune = (id: number) => {
    ApiService.destroy('communes/' + id).then((response) => {
      this.communes.splice(this.communes.findIndex(commune => commune.id === id), 1);
    }).catch((error) => {
      this.showDashboardError(error.message);
    });
  }

  getCommunes = (): Promise<any> => {
    this.dataLoading = true;
    return ApiService.get('communes').then((response) => {
      this.communes = [];
      for (let i = 0; i < response.length; i++) {
        this.communes.push(response[i].commune);
      }
    }).catch((error) => {
      this.showDashboardError(error.message);
    }).then(() => {
      this.dataLoading = false;
    });
  }

  // USER RELATED METHODS
  getUser = (): Promise<any> => {
    return ApiService.get('/users/' + this.current_user.id).then((response) => {
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
    this.registerError.isError = false;
    this.registerLoading = true;
    let payload =  user;
    ApiService.post('users/', payload).then((response) => {
      this.logIn(user.username, user.password as string);
      this.registerLoading = false;
    }).catch((error: any) => {
      this.registerError = error;
      this.registerError.isError = true;
      this.registerLoading = false;
    });
  }

  logIn = (username: string, password: string) => {
    this.loginLoading = true;
    this.loginError.isError = false;
    ApiService.post('usertoken', { auth: { username: username, password: password}}).then((response) => {
      sessionStorage.setItem('token', response.jwt);
      this.loginLoading = false;
      this.loggedIn = true;
      createBrowserHistory.push('/communelist');
    }).catch((error) => {
      this.loginLoading = false;
      this.loginError = error;
    });
  }

  logOut = () => {
    sessionStorage.clear();
    this.loggedIn = false;
    createBrowserHistory.push('/login');
  }

}