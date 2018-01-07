import { MainState } from './state';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { KolhoosiError } from './error';
import { getMuiTheme, darkBaseTheme } from 'material-ui/styles';
import { DashboardActivityFeed } from '../components/dashboard/dashboard-component/dashboard_activity_feed';

export class UiState {

  mainState: MainState;
  // Loading indicators
  @persist @observable loginLoading: boolean = false;
  @persist @observable dashboardLoading: boolean = false;
  @persist @observable registerLoading: boolean = false;
  @persist @observable dataLoading: boolean = false;
  @persist @observable dashboardDataRefreshed: number;

  themes: string[] = ['dark', 'default', 'darkBase', 'lightBase'];

  @persist('list') @observable locationHistory: string[] = [];

  // Error indicators and errors
  @persist('object') @observable loginError: KolhoosiError = new KolhoosiError('', []);
  @persist('object') @observable registerError: KolhoosiError = new KolhoosiError('', []);
  @persist @observable snackbarMessage: string = '';
  @persist @observable showSnackbar: boolean = false;
  @persist('object') @observable dataError: KolhoosiError = new KolhoosiError('', []);

  constructor(mainState: MainState) {
    this.mainState = mainState;
  }

  @action
  async getDashboardContents(force: boolean) {
    if (!force && this.dashboardDataRefreshed && this.dashboardDataRefreshed + 60000 > Date.now()) {
      return;
    }
    this.dashboardDataRefreshed = Date.now();
    this.dataLoading = true;
    try {
      await Promise.all([
        this.mainState.taskState.getTasks(),
        this.mainState.purchaseState.getBudget(),
        this.mainState.communeState.getTopList(),
        this.mainState.communeState.getFeed()
      ]);

    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    } finally {
      this.dataLoading = false;
    }
  }

  @action
  showDashboardError = (message: string) => {
    this.snackbarMessage = message;
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    },         4000);
  }

  @action
  switchTheme = (theme: string) => {
    window.location.reload();
  }

  getKolhoosiTheme = () => {
    let theme;
    if (this.mainState.userState.current_user) {
      theme = this.mainState.userState.current_user.default_theme;
    } else {
      theme = 'default';
    }
    switch (theme) {
      case 'darkBase':
        return getMuiTheme(darkBaseTheme);
      case 'lightBase':
        return getMuiTheme();
      case 'dark':
        return getMuiTheme({
          palette: {
            primary1Color: '#2f4f4f',
            primary2Color: '#fff',
            primary3Color: '#2f4f4f',
            accent1Color: '#fff',
            accent2Color: '#fff',
            accent3Color: '#fff',
            canvasColor: '#2f4f4f',
            textColor: '#fff',
            disabledColor: '#fff',
            alternateTextColor: '#fff',
            secondaryTextColor: '#fff'
          },
          fontFamily: 'Roboto, sans-serif',
          textField: {
            focusColor: '#fff'
          },
          raisedButton: {
            color: '#2f4f4f'
          }

        });
      default:
        return getMuiTheme({
          palette: {
            primary1Color: '#FF0025',
            primary2Color: '#EF5350',
            primary3Color: '#BDBDBD',
            accent1Color: '#FFBF00',
            accent2Color: '#FFFF8D',
            accent3Color: '#9E9E9E',
            textColor: '#030303',
            alternateTextColor: '#fff',
          },
          fontFamily: 'Roboto, sans-serif'
        });
    }

  }
}
