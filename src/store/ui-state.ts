import { MainState } from './state';
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { KolhoosiError } from './error';
import { red, yellow, grey, green } from 'material-ui/colors';
import createMuiTheme, { Theme } from 'material-ui/styles/createMuiTheme';
import blue from 'material-ui/colors/blue';
import purple from 'material-ui/colors/purple';
import deepPurple from 'material-ui/colors/deepPurple';
import pink from 'material-ui/colors/pink';

export class UiState {

  mainState: MainState;

  @observable mobileState = false;
  // Loading indicators
  @persist @observable loginLoading: boolean = false;

  // PURCHASES
  @observable purchaseLoading: boolean = false;
  @observable purchaseDialogOpen: boolean = false;
  @observable refundDialogOpen: boolean = false;
  // TASKS
  @observable tasksLoading: boolean = false;
  // COMMUNE
  @observable communesLoading: boolean = false;

  @persist @observable dashboardLoading: boolean = false;
  @persist @observable registerLoading: boolean = false;
  @persist @observable dataLoading: boolean = false;
  @persist @observable dashboardDataRefreshed: number;

  themes: string[] = ['dark', 'default', 'darkBase', 'lightBase'];

  @persist('list') @observable locationHistory: string[] = [];

  // Error indicators and errors
  @persist('object') @observable loginError: KolhoosiError = new KolhoosiError('', []);
  @persist('object') @observable registerError: KolhoosiError = new KolhoosiError('', []);
  @persist('object') @observable dataError: KolhoosiError = new KolhoosiError('', []);

  @observable snackbarMessage: string = '';
  @observable showSnackbar: boolean = false;
  @observable undoFunction: any = null;
  snackBarTimeout: any;

  constructor(mainState: MainState) {
    this.mainState = mainState;
    this.intializeMedialistener();
  }

  intializeMedialistener = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (mediaQuery.matches) {
      this.mobileState = false;
    } else {
      this.mobileState = true;
    }
    mediaQuery.addListener((mq) => {
      if (mq.matches) {
        this.mobileState = false;
      } else {
        this.mobileState = true;
      }
    });

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
        this.mainState.communeState.getFeed(),
        this.mainState.communeState.getTopList(),
        this.mainState.purchaseState.getPurchases(),
        this.mainState.purchaseState.getRefunds(),
      ]);

    } catch (error) {
      this.mainState.uiState.showDashboardError(error.message);
    } finally {
      this.dataLoading = false;
    }
  }

  @action
  showDashboardError = (message: string, undo?: any) => {
    undo ? this.undoFunction = undo : this.undoFunction = null;
    this.snackbarMessage = message;
    this.showSnackbar = true;
    if (this.snackBarTimeout) {
      clearTimeout(this.snackBarTimeout);
    }
    this.snackBarTimeout = setTimeout(
      () => {
        this.showSnackbar = false;
      },
      4000
    );
  }

  @action
  switchTheme = (theme: string) => {
    window.location.reload();
  }

  getKolhoosiTheme = (): Theme => {
    let theme;
    if (this.mainState.userState.current_user) {
      theme = this.mainState.userState.current_user.default_theme;
    } else {
      theme = 'default';
    }

    const palette = {
      primary: red,
      secondary: yellow,
    };

    const palette2 = {
      primary: pink,
      secondary: purple,
      type: 'dark' as 'dark',
    };
    const theme2 = createMuiTheme({
      palette: palette
    });

    return createMuiTheme({
      palette: palette2,
      overrides: {
        MuiDrawer: {
          paper: {
            width: '250px'
          }
        },
        MuiButton: {
          root: {
            backgroundColor: grey[50],
            color: green[500]
          },
          raised: {
            backgroundColor: grey[50],
            color: green[500]
          }
        }
      }
    });
    // switch (theme) {
    //   case 'darkBase':
    //     return getMuiTheme(darkBaseTheme);
    //   case 'lightBase':
    //     return getMuiTheme();
    //   case 'dark':
    //     return getMuiTheme({
    //       palette: {
    //         primary1Color: '#2f4f4f',
    //         primary2Color: '#fff',
    //         primary3Color: '#2f4f4f',
    //         accent1Color: '#fff',
    //         accent2Color: '#fff',
    //         accent3Color: '#fff',
    //         canvasColor: '#2f4f4f',
    //         textColor: '#fff',
    //         disabledColor: '#fff',
    //         alternateTextColor: '#fff',
    //         secondaryTextColor: '#fff'
    //       },
    //       fontFamily: 'Roboto, sans-serif',
    //       textField: {
    //         focusColor: '#fff'
    //       },
    //       raisedButton: {
    //         color: '#2f4f4f'
    //       }

    //     });
    //   default:
    //     return getMuiTheme({
    //       palette: {
    //         primary1Color: '#FF0025',
    //         primary2Color: '#EF5350',
    //         primary3Color: '#BDBDBD',
    //         accent1Color: '#FFBF00',
    //         accent2Color: '#FFFF8D',
    //         accent3Color: '#9E9E9E',
    //         textColor: '#030303',
    //         alternateTextColor: '#fff',
    //       },
    //       fontFamily: 'Roboto, sans-serif'
    //     });
    // }

  }
}
