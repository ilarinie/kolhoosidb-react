import { MainState } from './state';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { KolhoosiError } from './error';
export class UiState {
    mainState: MainState;

     // Loading indicators
  @persist @observable loginLoading: boolean = false;
  @persist @observable dashboardLoading: boolean = false;
  @persist @observable registerLoading: boolean = false;
  @persist @observable dataLoading: boolean = false;

  // Error indicators
  @persist('object') @observable loginError: KolhoosiError = new KolhoosiError('', []);
  @persist('object') @observable registerError: KolhoosiError = new KolhoosiError('', []);
  @persist @observable snackbarMessage: string = '';
  @persist @observable showSnackbar: boolean = false;
  @persist('object') @observable dataError: KolhoosiError = new KolhoosiError('', []);

    constructor(mainState: MainState) {
        this.mainState = mainState;
    }

    @action
    showDashboardError = (message: string) => {
      this.snackbarMessage = message;
      this.showSnackbar = true;
      setTimeout(() => {
        this.showSnackbar = false;
      },         4000);
    }

}