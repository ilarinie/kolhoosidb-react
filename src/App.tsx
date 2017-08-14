import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { LoginComponent } from './components/login';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import createBrowserHistory from './history';
import {  mainState, MainState } from './store/state';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { kolhoosiTheme } from './theme';
import { create } from 'mobx-persist';

// This will fetch the app state from localstorage.
const hydrate = create({});
hydrate('uiState', mainState.uiState);
hydrate('userState', mainState.userState);
hydrate('authState', mainState.authState);
hydrate('communeState', mainState.communeState);

class App extends React.Component<{}, {}> {
  render(): any {
    return (
      <div>
        <MuiThemeProvider 
          muiTheme={kolhoosiTheme}
        >
          <Provider mainState={mainState}>
            <Router history={createBrowserHistory}>
              <Switch>
                <Route path="/login" component={LoginComponent} />
                <DashboardRoute path="/" component={Dashboard} />
              </Switch>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

/* tslint:disable */
const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    mainState.authState.token !== '' ?
     ( <Component {...props} /> ) :
     ( <Redirect to={{pathname: '/login', state: { from: props.location } }}/>)
    )}
  />
);

export const CommuneSelectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
  mainState.communeState.communeSelected ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/communelist',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

export const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
mainState.authState.token !== '' ? (
      <Redirect to={{
        pathname: '/communelist',
        state: { from: props.location }
        }}/>
      
    ) : (
      <Component {...props}/>
    )
  )}/>
);

export default App;
