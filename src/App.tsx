import * as React from 'react';
import './App.css';
import { Provider, observer, inject } from 'mobx-react';
import { LoginComponent } from './components/login';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import createBrowserHistory from './history';
import { mainState } from './store/state';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { kolhoosiTheme } from './theme';
import { create } from 'mobx-persist';
import { SelectField, MenuItem, RaisedButton } from 'material-ui';
import { UiState } from './store/ui-state';
import { observable } from 'mobx';

mainState.reset();
// This will fetch the app state from localstorage.
const hydrate = create({ storage: localStorage });
hydrate('uiState', mainState.uiState).then((uiState) => {

  if (uiState.locationHistory.length !== 0) {
    createBrowserHistory.push(uiState.locationHistory[uiState.locationHistory.length - 1]);
  }
  startLocationHistoryListen();
});
hydrate('userState', mainState.userState);
hydrate('authState', mainState.authState);
hydrate('communeState', mainState.communeState).then(() => {
  console.log('hydrated');
});

const startLocationHistoryListen = () => {
  createBrowserHistory.listen(location => {
    mainState.uiState.locationHistory.push(location.pathname);
  });
};
class App extends React.Component<{}, {}> {
  render(): any {
    return (
      <div>
        <ThemeObserver uiState={mainState.uiState}>
          <Provider mainState={mainState}>
            <Router history={createBrowserHistory}>
              <Switch>
                <Route path="/login" component={LoginComponent} />
                <DashboardRoute path="/" component={Dashboard} />
              </Switch>
            </Router>
          </Provider>
        </ThemeObserver>
      </div>
    );
  }
}

/* tslint:disable */
const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    mainState.authState.token !== '' ?
      (<Component {...props} />) :
      (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
  )}
  />
);

export const CommuneSelectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    mainState.communeState.communeSelected ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/communelist',
          state: { from: props.location }
        }} />
      )
  )} />
);

export const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    mainState.authState.token !== '' ? (
      <Redirect to={{
        pathname: '/communelist',
        state: { from: props.location }
      }} />

    ) : (
        <Component {...props} />
      )
  )} />
);



@inject('uiState')
@observer
export class ThemeObserver extends React.Component<{ uiState: UiState }, {}> {
  constructor(props: any) {
    super(props);

  }
  render() {
    return (
      <MuiThemeProvider muiTheme={mainState.uiState.getKolhoosiTheme()}
      >
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

export class ThemeSelector extends React.Component<{}, { value: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0
    }
  }
  render() {
    const { value } = this.state;
    let themes = mainState.uiState.themes.map((theme, index) => (
      <MenuItem value={index} key={index} primaryText={theme} />
    ));
    return (
      <div>
        <SelectField
          floatingLabelText="Theme"
          value={value}
          onChange={this.handleChange}
        >
          {themes}
        </SelectField>
        <RaisedButton label="select" onTouchTap={this.selectTheme} />
      </div>
    )
  }

  handleChange = (event, index, value) => {
    let val = this.state.value;
    val = value;
    this.setState({ value: val });
  }

  selectTheme = () => {
    mainState.uiState.switchTheme('asd');
  }

}

export default App;
