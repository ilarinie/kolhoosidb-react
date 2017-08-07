import { observable, autorun, toJS, extendObservable } from 'mobx';
import createBrowserHistory from '../history';
import * as ApiService from './api-service';
import { Commune } from './models/commune';
import { User } from './models/user';
import { log, catAppState } from '../log-config';
import { KolhoosiError } from './error';
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
      log.info('AppState is being saved to sessionStorage:', catAppState);
      log.info(JSON.parse(json), catAppState);
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
  @observable loginError: KolhoosiError = new KolhoosiError('', []);
  @observable registerError: KolhoosiError = new KolhoosiError('', []);
  @observable snackbarMessage: string = '';
  @observable showSnackbar: boolean = false;

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
    log.info('Trying to find AppState in sessionStorage', catAppState);
    if (sessionStorage.getItem('appstate') !== null || sessionStorage.getItem('appstate') !== undefined) {
      log.info('AppState is being fetched from sessionStorage', catAppState);
      const data: any = JSON.parse(sessionStorage.getItem('appstate') as string);
      extendObservable(this, data);
    }
  }

  save(json: string) {
    sessionStorage.setItem('appstate', json);
  }

  asd = (message: string) => {
    console.log('callds');
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
      log.info('ApiService provided response (createCommune:', catAppState);
      log.info(response, catAppState);
      this.communes.push(response.commune as Commune);
      this.selectCommune(this.communes.length - 1);
    }).catch((error) => {
      log.info('ApiService provided error (createCommune):', catAppState);
      log.info(error.message, catAppState);
    });
  }

  deleteCommune = (id: number) => {
    log.info(`DeleteCommune method called in AppState, id: ${id}`, catAppState);
    ApiService.destroy('communes/' + id).then((response) => {
      log.info('ApiService provided response (deleteCommune):', catAppState);
      log.info(response, catAppState);
      log.info(this.communes.findIndex(commune => commune.id === id) + '', catAppState);
      this.communes.splice(this.communes.findIndex(commune => commune.id === id), 1);
    }).catch((error: Error) => {
      log.info('ApiService provided error (deleteCommune):', catAppState);
      console.log(error.message);
    });
  }

  getCommunes = (): Promise<any> => {
    log.info(`GetCommunes called in ApiService`, catAppState);
    return ApiService.get('communes').then((response) => {
      log.info(`GetCommunes returned ${response}`, catAppState);
      console.log(response);
      this.communes = [];
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].commune);
        this.communes.push(response[i].commune);
      }
      // this.communes = response as Commune[];
    }).catch((error) => {
      log.info(`GetCommunes returned error ${error}`);
      // console.log(error);
      this.asd(error.message);
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
    log.info('CreateUser function called in AppState. User:', catAppState);
    log.info({msg: 'User:' , data: user }, catAppState);
    ApiService.post('users/', payload).then((response) => {
      log.info('ApiService provided response:', catAppState);
      log.info(response, catAppState);
      let createdUser: User = response as User;
      this.logIn(user.username, user.password as string);
      this.registerLoading = false;
    }).catch((error: any) => {
      log.info('ApiService provided error:', catAppState);
      log.info(error, catAppState);
      this.registerError = error;
      this.registerError.isError = true;
      this.registerLoading = false;
    });
  }

  logIn = (username: string, password: string) => {
    this.loginLoading = true;
    this.loginError.isError = false;
    log.info(`Log in function called in AppState: username: ${username}, password: ${password}`, catAppState);
    ApiService.post('usertoken', { auth: { username: username, password: password}}).then((response) => {
      // tslint:disable-next-line:no-empty
      while (response.jwt === null) { }
      log.info(`Login function in ApiService returned:`, catAppState);
      log.info(response, catAppState);
      sessionStorage.setItem('token', response.jwt);
      this.loginLoading = false;
      this.loggedIn = true;
      if (this.communeSelected) {
        log.info('Login function redirecting to dashboard.', catAppState);
        createBrowserHistory.push('/');
      } else {
        this.getCommunes().then((res) => {
          log.info('Login function redirecting to commune list.', catAppState);
          createBrowserHistory.push('/communelist');
        });
      }
    }).catch((error) => {
      log.info({msg: 'Login function received error', data: error}, catAppState);
      this.loginLoading = false;
      this.loginError = error;
    });
  }

  logOut = () => {
    sessionStorage.clear();
    log.info(`Session storage cleared by logout function.`, catAppState);
    this.loggedIn = false;
    createBrowserHistory.push('/login');
  }
}