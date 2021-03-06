import * as React from 'react';
import './App.css';
import { Provider, observer, inject } from 'mobx-react';
import LoginComponent from './components/login';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import createBrowserHistory from './history';
import { mainState } from './store/state';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { create } from 'mobx-persist';
import { UiState } from './store/ui-state';
import { observable } from 'mobx';
import ThemeObserver from './theme-observer';

mainState.reset();
// This will fetch the app state from localstorage.
const hydrate = create({ storage: localStorage, jsonify: true });
hydrate('uiState', mainState.uiState).then((uiState) => {

  if (uiState.locationHistory.length !== 0) {
    createBrowserHistory.push(uiState.locationHistory[uiState.locationHistory.length - 1]);
  }
  startLocationHistoryListen();
});
hydrate('userState', mainState.userState);
hydrate('authState', mainState.authState);
hydrate('communeState', mainState.communeState);

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
              <div style={{ width: '100vw', maxWidth: '100%', backgroundColor: mainState.uiState.getKolhoosiTheme().palette.background.default }} >
                <Switch>
                  <Route path="/login" component={LoginComponent} />
                  <DashboardRoute path="/" component={Dashboard} />
                </Switch>
              </div>
            </Router>
          </Provider>
        </ThemeObserver>
      </div >
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
    mainState.communeState.selectedCommune ? (
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





export default App;
